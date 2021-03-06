import { memo } from "../lib.js"

function safeNum(num) {
    if (typeof num === "number" && !isNaN(num)) return num
    else return 0
}

function getApiData(item, apiData) {
    let { id } = item
    if (!apiData[item.id]) {
        return { symbol: id, name: id }
    }

    return { ...apiData[id] }
}

function getPriceAndChange(market_data, verCurr, period) {
    let price = safeNum(market_data.current_price[verCurr])
    let change = safeNum(market_data[`price_change_percentage_${period}_in_currency`][verCurr])
    return {
        verCurr,
        price,
        change,
    }
}

function getMarketData(item, settings, apiData) {
    let { priceChangePeriod, currentCurrencies } = settings
    let { id } = item
    currentCurrencies = currentCurrencies.map(e => e.toLowerCase())
    if (!apiData[id]) {
        return {
            prices: currentCurrencies.map(verCurr => {
                return { verCurr, price: 0, change: 0 }
            }),
            market_cap_rank: 0,
        }
    }
    let { market_data, market_cap_rank } = apiData[id]
    let prices = currentCurrencies.map(currency => getPriceAndChange(market_data, currency, priceChangePeriod))

    return { prices, market_cap_rank: safeNum(market_cap_rank) }
}

function getValues(item, marketData) {
    let { amount } = item

    return {
        values: marketData.prices.map(({ verCurr, price, change }) => {
            let value = price * amount
            return {
                verCurr,
                value: safeNum(value),
                change: value - value / (1 + change / 100),
            }
        }),
    }
}

export const getFullItem = function(store, id) {
    const { settings, apiData: allApiData, portfolio } = store

    const item = { ...portfolio[id] }
    const apiData = getApiData(item, allApiData)
    const marketData = getMarketData(item, settings, allApiData)
    const values = getValues(item, marketData)

    return { ...item, ...apiData, ...marketData, ...values }
}

export const getFullPortfolio = function(store) {
    let { portfolio } = store

    portfolio = Object.keys(portfolio)
        .map(key => portfolio[key].id)
        .map(id => {
            return getFullItem(store, id)
        })

    return portfolio
}

const _portfolioStructure = function(portfolio, apiData) {
    portfolio = Object.keys(portfolio)
        .map(key => portfolio[key])
        .map(({ id, amount }) => {
            const priceUSD = apiData[id] ? apiData[id].market_data.current_price.usd : 0

            return {
                id,
                value: safeNum(amount * priceUSD),
            }
        })

    let total =
        portfolio.reduce((acc, e) => {
            acc += e.value
            return acc
        }, 0) || 1

    let res = {}

    for (let item of portfolio) {
        let { id, value } = item
        res[id] = (value / total) * 100
    }

    return res
}

export const getPortfolioStructure = function(store) {
    let { portfolio, apiData } = store
    return _portfolioStructure(portfolio, apiData)
}
