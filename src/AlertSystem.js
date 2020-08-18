import { useEffect } from "react"
import { connect } from "react-redux"
import { removeAlert, changeAlert } from "./redux/actions/alerts"
import { numToFormattedString, timeStrToMS, memo } from "./lib"

const audioPath = (process.env.NODE_ENV === "production" ? "/CoinWatcher" : "") + "/sounds/notif.wav"

const NotifAudio = new Audio(audioPath)


function checkPriceAlert(priceAlert, apiData) {
    let { currencyId, price, priceOnCreation, verCurr } = priceAlert
    if (!apiData[currencyId]) {
        return false
    }
    let currentPrice = apiData[currencyId].market_data.current_price[verCurr.toLowerCase()]

    if (currentPrice > price && price > priceOnCreation) {
        return { priceAlert, currentPrice, targetIsHigher: true }
    }
    if (currentPrice < price && price < priceOnCreation) {
        return { priceAlert, currentPrice, targetIsHigher: false }
    }
    return false
}

function renderPriceAlert({ priceAlert, currentPrice, targetIsHigher, sound }) {
    let { verCurr, name } = priceAlert
    try {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(`Coin Watcher alert`, {
                body: `${name} @ ${
                    numToFormattedString(currentPrice, {
                        type: "currency",
                        currency: verCurr,
                    }).str
                    }`,
                icon: targetIsHigher ? "/CoinWatcher/images/green-delta.png" : "/CoinWatcher/images/red-delta.png",
                requireInteraction: true,
            })
        }).then(() => {
            if (sound) NotifAudio.play()
        })
    } catch (e) {
        console.error(e)
    }
}

function afterPriceAlert(priceAlert, removeAlert) {
    removeAlert(priceAlert)
}

function checkTimePermission(lastTimeFired, period) {
    let time = timeStrToMS(period)
    if (time === null) {
        throw new Error("unrecognized time suffix")
    }

    return Date.now() - lastTimeFired > time
}

function checkPercAlert(percAlert, apiData) {
    let { percChange, period, verCurr, lastTimeFired } = percAlert
    if (!apiData) {
        return
    }
    let recentPriceChange = apiData.market_data[`price_change_percentage_${period}_in_currency`][verCurr.toLowerCase()]

    if (Math.abs(recentPriceChange) > percChange && checkTimePermission(lastTimeFired, period)) {
        let currentPrice = apiData.market_data.current_price[verCurr.toLowerCase()]
        return {
            percAlert,
            recentPriceChange,
            currentPrice,
        }
    }

    return false
}

function renderPercAlert(percAlert, recentPriceChange, currentPrice, sound) {
    let { period, verCurr, name } = percAlert
    try {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(`Coin Watcher alert`, {
                body: `${name} ${period} change: ${
                    numToFormattedString(recentPriceChange, {
                        type: "percentage",
                        isChange: true,
                    }).str
                    } (${
                    numToFormattedString(currentPrice, {
                        type: "currency",
                        currency: verCurr,
                    }).str
                    })`,
                icon:
                    recentPriceChange < 0 ? "/CoinWatcher/images/red-delta.png" : "/CoinWatcher/images/green-delta.png",
                requireInteraction: true,
            })
        }).then(() => {
            if (sound) NotifAudio.play()
        })
    } catch (e) {
        console.error(e)
    }
}

function afterPercAlert(percAlert, changeAlert) {
    changeAlert({ ...percAlert, lastTimeFired: Date.now() })
}

function processPriceAlerts(priceAlerts, apiData, removeAlert, sound) {
    priceAlerts.forEach(alert => {
        let check = checkPriceAlert(alert, apiData)
        if (check) {
            renderPriceAlert(check, sound)
            afterPriceAlert(alert, removeAlert)
        }
    })
}

function separatePercAlerts(percAlertsMap) {
    let res = {}
    for (let key in percAlertsMap) {
        res[key] = percAlertsMap[key].reduce((acc, e) => {
            if (!acc[e.period]) {
                acc[e.period] = [e]
            } else {
                acc[e.period].push(e)
            }

            return acc
        }, {})
    }

    return res
}

const processPercAlertsForItem = memo(function processPercAlertsForItem(separatedAlerts, apiDataForItem, changeAlert, sound) {
    for (let period in separatedAlerts) {
        //sort percentage alerts to only render the alert with the highest percChange value
        let sortedAlerts = separatedAlerts[period].sort(
            (alert1, alert2) => Math.abs(alert2.percChange) - Math.abs(alert1.percChange)
        )

        /*
    only render the first alert that checks out, but mark the rest alerts as handled
    to prevent annoying multifires due to a sudden
    */
        let alertWasShown = false
        for (let alert of sortedAlerts) {
            let result = checkPercAlert(alert, apiDataForItem)
            if (result) {
                let { percAlert, recentPriceChange, currentPrice } = result
                if (!alertWasShown) {
                    renderPercAlert(percAlert, recentPriceChange, currentPrice, sound)
                    alertWasShown = true
                }
                afterPercAlert(percAlert, changeAlert)
            }
        }
    }
})

function processPercAlerts(percAlerts, apiData, changeAlert, sound) {
    let percAlertsMap = percAlerts.reduce((acc, alert) => {
        if (acc[alert.currencyId]) {
            acc[alert.currencyId].push(alert)
        } else {
            acc[alert.currencyId] = [alert]
        }
        return acc
    }, {})

    let separated = separatePercAlerts(percAlertsMap)

    for (let key in separated) {
        let separatedAlerts = separated[key]
        let apiDataForItem = apiData[key]
        processPercAlertsForItem(separatedAlerts, apiDataForItem, changeAlert, sound)
    }
}

//todo fix bug with stale alerts - do diffing for each alert
function _AlertSystem({ alerts, apiData, changeAlert, removeAlert, settings }) {
    let { priceAlerts, percAlerts } = alerts
    let { sound } = settings
    //only run the system when apiData changes, to create grace period for newly created alerts
    useEffect(
        () => {
            processPriceAlerts(priceAlerts, apiData, removeAlert, sound)
            processPercAlerts(percAlerts, apiData, changeAlert, sound)
        },
        [apiData]
    )

    return null
}

export const AlertSystem = connect(
    store => {
        let { alerts, apiData, settings } = store
        return { alerts, apiData, settings }
    },
    { removeAlert, changeAlert }
)(_AlertSystem)
