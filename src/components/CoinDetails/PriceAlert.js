import React from "react"
import { connect } from "react-redux"
import VerCurrSelect from "./VerCurrSelect"
import { changeAlert, removeAlert } from "../../redux/actions/alerts"

export const PriceAlert = connect(
    null,
    { changeAlert, removeAlert }
)(function PriceAlert({ priceAlert, changeAlert, removeAlert, allPrices }) {
    let { price, verCurr } = priceAlert
    return (
        <div className="price-alert">
            <div>Price:</div>
            <input
                className="inp"
                autoComplete="off"
                type="number"
                name="amount"
                size={16}
                value={price}
                onChange={event => {
                    let priceOnCreation = allPrices[verCurr.toLowerCase()] || 0
                    let newState = { ...priceAlert, price: Number(event.target.value), priceOnCreation }
                    changeAlert(newState)
                }}
            />
            <div className="currency-container">
                <VerCurrSelect
                    defaultCurrency={verCurr}
                    callback={currency => {
                        let priceOnCreation = allPrices[currency.toLowerCase()] || 0
                        let newState = { ...priceAlert, verCurr: currency, priceOnCreation }
                        changeAlert(newState)
                    }}
                />
            </div>
            <div
                className="remove-X clickable"
                onClick={() => {
                    removeAlert(priceAlert)
                }}
            >
                ×
            </div>
        </div>
    )
})
