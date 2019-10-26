import { useEffect } from "react"
import { loadVersusCurrencies, loadSupportedCoins, getItemData } from "./network"
import { connect } from "react-redux"
import { setSupportedVerCurr } from "./redux/actions/supportedVerCurr"
import { setSupportedCoins } from "./redux/actions/supportedCoins"
import { setItemApiData } from "./redux/actions/apiData"
import { increment, decrement } from "./redux/actions/activeRequests"

async function loadAndSetSupportedCoins(setSupportedCoins, increment, decrement) {
    try {
        increment()
        let supportedCoins = await loadSupportedCoins()
        setSupportedCoins(supportedCoins)
    } catch (e) {
        console.error(e)
        console.warn("failed to load supported coins")
    } finally {
        decrement()
    }
}

async function loadAndSetSupportedVerCurr(setSupportedVerCurr, increment, decrement) {
    try {
        increment()
        let verCurr = await loadVersusCurrencies().then(r => r.sort((a, b) => a.localeCompare(b)))
        setSupportedVerCurr(verCurr)
    } catch (e) {
        console.error(e)
        console.warn("failed to load supported versus currencies")
    } finally {
        decrement()
    }
}

async function loadAndSetMarketData(portfolio, setItemApiData, increment, decrement) {
    for (let id in portfolio) {
        increment()
        getItemData(id)
            .then(data => {
                setItemApiData({
                    id,
                    data,
                })
            })
            .catch(e => {
                console.error(e)
                console.warn(`failed to load api data for ${id}`)
            })
            .finally(decrement)
    }
}

let loopId = null

async function priceUpdateLoop(portfolio, setItemApiData, updateInterval, increment, decrement) {
    console.log("updaing market data")
    clearTimeout(loopId)
    loopId = setTimeout(
        priceUpdateLoop,
        updateInterval,
        portfolio,
        setItemApiData,
        updateInterval,
        increment,
        decrement
    )
    await loadAndSetMarketData(portfolio, setItemApiData, increment, decrement)
}

function _MarketFetcher({
    portfolio,
    settings,
    setSupportedVerCurr,
    setSupportedCoins,
    setItemApiData,
    increment,
    decrement,
}) {
    //run this once
    useEffect(() => {
        loadAndSetSupportedCoins(setSupportedCoins, increment, decrement)
        loadAndSetSupportedVerCurr(setSupportedVerCurr, increment, decrement)
    }, [])

    useEffect(
        () => {
            priceUpdateLoop(portfolio, setItemApiData, settings.updateInterval, increment, decrement)
            function onFocus() {
                priceUpdateLoop(portfolio, setItemApiData, settings.updateInterval, increment, decrement)
            }
            window.addEventListener("focus", onFocus)

            return () => window.removeEventListener("focus", onFocus)
        },
        [settings.updateInterval]
    )

    return null
}

export const MarketFetcher = connect(
    state => {
        return { portfolio: state.portfolio, settings: state.settings }
    },
    { setSupportedVerCurr, setSupportedCoins, setItemApiData, increment, decrement }
)(_MarketFetcher)
