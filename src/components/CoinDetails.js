import React from "react"
import { Link } from "react-router-dom"

import "./css/CoinDetails.css"
import { removeItem, changeAmount } from "../redux/actions/portfolio"
import { connect } from "react-redux"
import { getFullItem } from "../redux/selectors"
import { numToFormattedString } from "../lib"
import { Trashcan } from "./assets"

function CoinDetails({ removeItem, changeAmount, location, fullItem }) {
    const { id } = location.state
    const { name, image, symbol, amount, prices, values } = fullItem
    return (
        <div className="page-container">
            <div className="modal-container" />

            <div id="coin-details">
                <div className="details-data-container">
                    <div>
                        <div className="top-icons">
                            <div> </div>
                            <div>
                                <img
                                    className="coin-logo-big"
                                    style={{ display: image ? "block" : "none" }}
                                    src={image}
                                />
                            </div>
                            <div
                                className="remove-btn-icon"
                                onClick={() => {
                                    removeItem(id)
                                }}
                            >
                                <Link to={{ pathname: "/" }} className="link-no-decor">
                                    <Trashcan />
                                </Link>
                            </div>
                        </div>

                        <div id="details-data">
                            <div>Coin:</div>
                            <div className="full-name v">
                                {" "}
                                {name} {symbol === name ? "" : symbol}
                            </div>
                            <label htmlFor="add-amount-details"> Amount:</label>
                            <input
                                className="add-inp v inp"
                                autoComplete="off"
                                type="number"
                                name="amount"
                                id="add-amount-details"
                                value={amount}
                                size={16}
                                onChange={ev => {
                                    changeAmount({ id, amount: ev.target.value })
                                }}
                            />
                            <div className="k">Portfolio share:</div> <div className="details-shareM v"> </div>
                        </div>
                    </div>

                    <div className="market-data-details-container">
                        <div className="market-data-details">
                            <div className="k">Price:</div>{" "}
                            <div className="v details-prices">
                                {prices.map(e => {
                                    let { verCurr, price } = e
                                    let { str: priceStr } = numToFormattedString(price, {
                                        type: "currency",
                                        currency: verCurr.toUpperCase(),
                                    })

                                    return (
                                        <div key={verCurr} className="table-cell">
                                            <div>{priceStr}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="k">Value:</div>{" "}
                            <div className="v details-values">
                                {values.map(e => {
                                    let { verCurr, value } = e
                                    let { str: valueStr } = numToFormattedString(value, {
                                        type: "currency",
                                        currency: verCurr.toUpperCase(),
                                    })

                                    return (
                                        <div key={verCurr} className="table-cell">
                                            <div>{valueStr}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="coin-details-alerts-container" />
                </div>

                <div className="message" style={{ color: "red", textAlign: "center" }} />
            </div>
        </div>
    )
}

export default connect(
    (store, ownProps) => {
        let { id } = ownProps.location.state
        return { fullItem: getFullItem(store, id) }
    },
    { removeItem, changeAmount }
)(CoinDetails)
