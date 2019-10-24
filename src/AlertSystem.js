import { connect } from "react-redux"
import { removeAlert, changeAlert } from "./redux/actions/alerts"
import { numToFormattedString, timeStrToMS } from "./lib"

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

function renderPriceAlert({ priceAlert, currentPrice, targetIsHigher }) {
    let { verCurr, name } = priceAlert
    try {
        navigator.serviceWorker.ready.then(function(registration) {
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
    let { currencyId, percChange, period, verCurr, lastTimeFired } = percAlert
    if (!apiData[currencyId]) {
        return
    }
    let recentPriceChange =
        apiData[currencyId].market_data[`price_change_percentage_${period}_in_currency`][verCurr.toLowerCase()]

    if (Math.abs(recentPriceChange) > percChange && checkTimePermission(lastTimeFired, period)) {
        let currentPrice = apiData[currencyId].market_data.current_price[verCurr.toLowerCase()]
        return {
            percAlert,
            recentPriceChange,
            currentPrice,
        }
    }

    return false
}

function renderPercAlert(percAlert, recentPriceChange, currentPrice) {
    let { period, verCurr, name } = percAlert
    try {
        navigator.serviceWorker.ready.then(function(registration) {
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
        })
    } catch (e) {
        console.error(e)
    }
}

function afterPercAlert(percAlert, changeAlert) {
    changeAlert({ ...percAlert, lastTimeFired: Date.now() })
}

function _AlertSystem({ alerts, apiData, changeAlert, removeAlert }) {
    let { priceAlerts, percAlerts } = alerts
    priceAlerts.forEach(alert => {
        let check = checkPriceAlert(alert, apiData)
        if (check) {
            renderPriceAlert(check)
            afterPriceAlert(alert, removeAlert)
        }
    })

    let percAlertsMap = percAlerts.reduce((acc, alert) => {
        if (acc[alert.currencyId]) {
            acc[alert.currencyId].push(alert)
        } else {
            acc[alert.currencyId] = [alert]
        }
        return acc
    }, {})

    for (let key in percAlertsMap) {
        let sortedAlerts = percAlertsMap[key].sort(
            (alert1, alert2) => Math.abs(alert2.percChange) - Math.abs(alert1.percChange)
        )

        for (let alert of sortedAlerts) {
            let result = checkPercAlert(alert, apiData)
            if (result) {
                let { percAlert, recentPriceChange, currentPrice } = result
                renderPercAlert(percAlert, recentPriceChange, currentPrice)
                afterPercAlert(percAlert, changeAlert)
                break
            }
        }
    }

    return null
}

export const AlertSystem = connect(
    store => {
        let { alerts, apiData } = store
        return { alerts, apiData }
    },
    { removeAlert, changeAlert }
)(_AlertSystem)
