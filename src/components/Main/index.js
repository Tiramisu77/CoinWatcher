import React from "react"
import "./main.css"
import { connect } from "react-redux"

import TotalValue from "./TotalValue"
import PortfolioLegend from "./PortfolioLegend"
import Portfolio from "./Portfolio"
import ChangePeriodButtons from "./ChangePeriodButtons"

function Main({ portfolio }) {
    return (
        <div id="main">
            <TotalValue portfolio={portfolio} />
            <PortfolioLegend />
            <Portfolio portfolio={portfolio} />
            <ChangePeriodButtons />
        </div>
    )
}

function getPriceAndChange(market_data, verCurr, period) {
    return {
        verCurr,
        price: market_data.current_price[verCurr],
        change: market_data[`price_change_percentage_${period}_in_currency`][verCurr],
    }
}

function addPrices(id, settings, apiData) {
    let { priceChangePeriod, currentCurrencies } = settings
    currentCurrencies = currentCurrencies.map(e => e.toLowerCase())
    if (!apiData[id]) {
        return {
            prices: currentCurrencies.map(verCurr => {
                return { verCurr, price: 0, change: 0 }
            }),
        }
    }
    let { market_data } = apiData[id]
    let prices = currentCurrencies.map(currency => getPriceAndChange(market_data, currency, priceChangePeriod))

    return { prices }
}

function addValues(item) {
    let { prices, amount } = item
    amount = Number(amount)

    return {
        values: prices.map(({ verCurr, price, change }) => {
            let value = price * amount
            return {
                verCurr,
                value,
                change: value - value / (1 + change / 100),
            }
        }),
    }
}

function addApiData(item, apiData) {
    if (!apiData[item.id]) {
        return {}
    }

    return { image: apiData[item.id].image, symbol: apiData[item.id].symbol }
}

const mapStateToProps = function(state) {
    let portfolio = Object.keys(state.portfolio).map(key => ({ ...state.portfolio[key] }))
    const { settings, apiData } = state

    portfolio = portfolio
        .map(item => {
            return { ...item, ...addApiData(item, apiData) }
        })
        .map(item => {
            return { ...item, ...addPrices(item.id, settings, apiData) }
        })
        .map(item => {
            return { ...item, ...addValues(item) }
        })

    return { portfolio }
}

export default connect(mapStateToProps)(Main)
