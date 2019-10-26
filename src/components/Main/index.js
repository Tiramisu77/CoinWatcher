import React from "react"
import "./main.css"
import { connect } from "react-redux"

import TotalValue from "./TotalValue"
import PortfolioLegend from "./PortfolioLegend"
import Portfolio from "./Portfolio"
import ChangePeriodButtons from "./ChangePeriodButtons"
import { ErrorBoundary } from "../ErrorBoundary"
import { getFullPortfolio } from "@app/redux/selectors"

function Main({ portfolio, settings }) {
    let sortedPortfolio = sortPortfolio([...portfolio], settings)

    return (
        <div id="main">
            <ErrorBoundary>
                <TotalValue portfolio={portfolio} />
            </ErrorBoundary>
            <PortfolioLegend />
            <Portfolio portfolio={sortedPortfolio} />
            <ChangePeriodButtons />
        </div>
    )
}

function sortPortfolio(portfolio, settings) {
    return portfolio.sort((item1, item2) => {
        switch (settings.portfolioSortedBy) {
            case "alphaAsc": {
                return item1.symbol.localeCompare(item2.symbol)
            }

            case "alphaDsc": {
                return item2.symbol.localeCompare(item1.symbol)
            }
            case "marketcapAsc": {
                return item1.market_cap_rank - item2.market_cap_rank
            }
            case "marketcapDsc": {
                return item2.market_cap_rank - item1.market_cap_rank
            }
            case "netvalAsc": {
                return item1.values[0].value - item2.values[0].value
            }
            case "netvalDsc": {
                return item2.values[0].value - item1.values[0].value
            }

            default:
                return 1
        }
    })
}

const mapStateToProps = function(state) {
    let { settings, portfolio } = state

    portfolio = getFullPortfolio(state)

    return { portfolio, settings }
}

export default connect(mapStateToProps)(Main)
