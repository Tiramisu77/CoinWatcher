function getApiData(item, apiData) {
    let { id } = item
    if (!apiData[item.id]) {
        return { symbol: id, name: id }
    }

    return { ...apiData[id] }
}

function getPriceAndChange(market_data, verCurr, period) {
    return {
        verCurr,
        price: market_data.current_price[verCurr],
        change: market_data[`price_change_percentage_${period}_in_currency`][verCurr],
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

    return { prices, market_cap_rank }
}

function getValues(item, marketData) {
    let { amount } = item

    return {
        values: marketData.prices.map(({ verCurr, price, change }) => {
            let value = price * amount
            return {
                verCurr,
                value,
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
