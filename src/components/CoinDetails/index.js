import React, { useState } from "react"
import { Link } from "react-router-dom"

import "./CoinDetails.css"
import { removeItem, changeAmount } from "../../redux/actions/portfolio"
import { connect } from "react-redux"
import { getFullItem } from "../../redux/selectors"
import { numToFormattedString } from "../../lib"
import { Trashcan, Bell } from "./assets"
import { NewAlertModal } from "./NewAlertModal"
import { PriceAlert } from "./PriceAlert"
import { PercAlert } from "./PercAlert"

function TopIcons({ image, id, removeItem }) {
    return (
        <div className="top-icons">
            <div> </div>
            <div>
                <img className="coin-logo-big" style={{ display: image ? "block" : "none" }} src={image} />
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
    )
}

function DetailsData({ name, symbol, id, changeAmount, amount }) {
    return (
        <div id="details-data">
            <div>Coin:</div>
            <div className="full-name v">
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
    )
}

function MarketData({ prices, values }) {
    return (
        <div className="market-data-details-container">
            <div className="market-data-details">
                <div className="k">Price:</div>
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
    )
}

function AlertContainer({ alerts, toggleModal, allPrices }) {
    let [error, setError] = useState(false)
    return (
        <div className="coin-details-alerts-container">
            <div className="coin-details-alerts">
                <div className="alert-title">
                    Alerts <Bell />
                </div>
                <div className="alert-container">
                    <div className="price-alerts-container"> </div>
                    {alerts.priceAlerts.map(priceAlert => {
                        let { id } = priceAlert
                        return <PriceAlert key={id} priceAlert={priceAlert} allPrices={allPrices} />
                    })}
                    <div className="perc-alerts-container">
                        {alerts.percAlerts.map(percAlert => {
                            let { id } = percAlert
                            return <PercAlert key={id} percAlert={percAlert} />
                        })}
                    </div>
                    <div> </div>
                </div>
                <div className="errormsg" style={{ color: "red", justifySelf: "center" }}>
                    {error}
                </div>
                <div
                    className="add-alert btn"
                    style={{ justifySelf: "center", width: "80px" }}
                    onClick={() => {
                        if (!("Notification" in window)) {
                            setError("Notifications are not supported in your browser")
                            return
                        }
                        if (Notification.permission !== "granted") {
                            Notification.requestPermission()
                            setError("Please enable notifications")

                            return
                        }

                        if (Object.keys(allPrices).length === 0) {
                            setError("no market data for this coin")
                            return
                        }

                        toggleModal(true)
                    }}
                >
                    new alert
                </div>
            </div>
        </div>
    )
}

function CoinDetails({ removeItem, changeAmount, location, fullItem, alerts, allPrices }) {
    const { id } = location.state
    const { name, image, symbol, amount, prices, values } = fullItem
    const [showModal, toggleModal] = useState(false)

    return (
        <div className="page-container">
            {showModal && (
                <div className="modal-container">
                    <NewAlertModal
                        hide={() => {
                            toggleModal(false)
                        }}
                        currencyId={id}
                        allPrices={allPrices}
                        name={name}
                    />
                </div>
            )}

            <div id="coin-details">
                <div className="details-data-container">
                    <div>
                        <TopIcons image={image} id={id} removeItem={removeItem} />
                        <DetailsData name={name} symbol={symbol} id={id} changeAmount={changeAmount} amount={amount} />
                    </div>

                    <MarketData prices={prices} values={values} />

                    <AlertContainer alerts={alerts} toggleModal={toggleModal} allPrices={allPrices} />
                </div>

                <div className="message" style={{ color: "red", textAlign: "center" }} />
            </div>
        </div>
    )
}

export default connect(
    (store, ownProps) => {
        let { id } = ownProps.location.state
        let { percAlerts, priceAlerts } = store.alerts
        let alerts = {
            percAlerts: percAlerts.filter(({ currencyId }) => currencyId === id),
            priceAlerts: priceAlerts.filter(({ currencyId }) => currencyId === id),
        }
        let allPrices = store.apiData[id] ? store.apiData[id].market_data.current_price : {}
        return { fullItem: getFullItem(store, id), alerts, allPrices }
    },
    { removeItem, changeAmount }
)(CoinDetails)
