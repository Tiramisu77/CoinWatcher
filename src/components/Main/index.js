import React from "react"
import "./main.css"
import { connect } from "react-redux"

import TotalValue from "./TotalValue"
import PortfolioLegend from "./PortfolioLegend"
import Portfolio from "./Portfolio"
import ChangePeriodButtons from "./ChangePeriodButtons"
import { ErrorBoundary } from "../ErrorBoundary"
import { getFullItem } from "../../redux/selectors"

function Main({ portfolio }) {
    return (
        <div id="main">
            <ErrorBoundary>
                <TotalValue portfolio={portfolio} />
            </ErrorBoundary>
            <PortfolioLegend />
            <Portfolio portfolio={portfolio} />
            <ChangePeriodButtons />
        </div>
    )
}

const mapStateToProps = function(state) {
    let portfolio = Object.keys(state.portfolio).map(key => ({ ...state.portfolio[key] }))
    const { settings } = state

    portfolio = portfolio
        .map(item => {
            return getFullItem(state, item.id)
        })

        .sort((item1, item2) => {
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

    return { portfolio }
}

export default connect(mapStateToProps)(Main)
