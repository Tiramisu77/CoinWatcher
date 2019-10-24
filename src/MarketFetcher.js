import { useEffect } from "react"
import { loadVersusCurrencies, loadSupportedCoins, getItemData } from "./network"
import { connect } from "react-redux"
import { setSupportedVerCurr } from "./redux/actions/supportedVerCurr"
import { setSupportedCoins } from "./redux/actions/supportedCoins"
import { setItemApiData } from "./redux/actions/apiData"

async function loadAndSetSupportedCoins(setSupportedCoins) {
    try {
        let supportedCoins = await loadSupportedCoins()
        setSupportedCoins(supportedCoins)
    } catch (e) {
        console.error(e)
        console.warn("failed to load supported coins")
    }
}

async function loadAndSetSupportedVerCurr(setSupportedVerCurr) {
    try {
        let verCurr = await loadVersusCurrencies().then(r => r.sort((a, b) => a.localeCompare(b)))
        setSupportedVerCurr(verCurr)
    } catch (e) {
        console.error(e)
        console.warn("failed to load supported versus currencies")
    }
}

async function loadAndSetMarketData(portfolio, setItemApiData) {
    for (let id in portfolio) {
        getItemData(id)
            .then(data => {
                let { image, market_data, symbol, market_cap_rank, name } = data
                setItemApiData({
                    id,
                    data: { image: image.small, market_data, symbol: symbol.toUpperCase(), market_cap_rank, name },
                })
            })
            .catch(e => {
                console.error(e)
                console.warn(`failed to load api data for ${id}`)
            })
    }
}

let loopId = null

async function priceUpdateLoop(portfolio, setItemApiData, updateInterval) {
    console.log("updaing market data")
    clearTimeout(loopId)
    loopId = setTimeout(priceUpdateLoop, updateInterval, portfolio, setItemApiData, updateInterval)
    await loadAndSetMarketData(portfolio, setItemApiData)
}

function _MarketFetcher({ portfolio, settings, setSupportedVerCurr, setSupportedCoins, setItemApiData }) {
    loadAndSetSupportedCoins(setSupportedCoins)
    loadAndSetSupportedVerCurr(setSupportedVerCurr)
    useEffect(
        () => {
            priceUpdateLoop(portfolio, setItemApiData, settings.updateInterval)
        },
        [settings]
    )

    return null
}

export const MarketFetcher = connect(
    state => {
        return { portfolio: state.portfolio, settings: state.settings }
    },
    { setSupportedVerCurr, setSupportedCoins, setItemApiData }
)(_MarketFetcher)
