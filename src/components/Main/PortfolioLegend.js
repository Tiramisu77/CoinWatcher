import React from "react"
import { sortPortfolioBy } from "../../redux/actions/settings"
import { connect } from "react-redux"

function PortfolioLegend({ portfolioSortedBy, sortPortfolioBy }) {
    return (
        <div className="legend-container">
            <div className="table-row legend">
                <div className="table-cell">
                    <span
                        className="coinL"
                        onClick={() => {
                            if (portfolioSortedBy === "alphaDsc") {
                                sortPortfolioBy("alphaAsc")
                            } else {
                                sortPortfolioBy("alphaDsc")
                            }
                        }}
                    >
                        {portfolioSortedBy === "alphaAsc"
                            ? "coin ↑"
                            : portfolioSortedBy === "alphaDsc"
                            ? "coin ↓"
                            : "coin ⇵"}
                    </span>
                </div>
                <div className="table-cell">
                    <span
                        className="pricesL"
                        onClick={() => {
                            if (portfolioSortedBy === "marketcapDsc") {
                                sortPortfolioBy("marketcapAsc")
                            } else {
                                sortPortfolioBy("marketcapDsc")
                            }
                        }}
                    >
                        {" "}
                        {portfolioSortedBy === "marketcapAsc"
                            ? "prices ↑"
                            : portfolioSortedBy === "marketcapDsc"
                            ? "prices ↓"
                            : "prices ⇵"}
                    </span>
                </div>
                <div
                    className="table-cell"
                    onClick={() => {
                        if (portfolioSortedBy === "netvalDsc") {
                            sortPortfolioBy("netvalAsc")
                        } else {
                            sortPortfolioBy("netvalDsc")
                        }
                    }}
                >
                    <span className=" valueL">
                        {portfolioSortedBy === "netvalAsc"
                            ? "value ↑"
                            : portfolioSortedBy === "netvalDsc"
                            ? "value ↓"
                            : "value ⇵"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default connect(
    function(store) {
        return { portfolioSortedBy: store.settings.portfolioSortedBy }
    },
    { sortPortfolioBy }
)(PortfolioLegend)
