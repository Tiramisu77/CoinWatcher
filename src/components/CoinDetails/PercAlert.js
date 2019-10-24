import React from "react"
import { connect } from "react-redux"
import VerCurrSelect from "./VerCurrSelect"
import { changeAlert, removeAlert } from "../../redux/actions/alerts"

export const PercAlert = connect(
    null,
    { changeAlert, removeAlert }
)(function PercAlert({ percAlert, changeAlert, removeAlert }) {
    let { percChange, verCurr, period } = percAlert
    return (
        <div className="perc-alert">
            <div>Change:</div>
            <input
                className="inp"
                autoComplete="off"
                type="number"
                name="percentage"
                size={16}
                value={percChange}
                onChange={event => {
                    let newState = { ...percAlert, percChange: Number(event.target.value), lastTimeFired: 0 }
                    changeAlert(newState)
                }}
            />
            <div>%</div>
            <select
                className="period-select"
                value={period}
                onChange={event => {
                    let newState = { ...percAlert, period: event.target.value, lastTimeFired: 0 }
                    changeAlert(newState)
                }}
            >
                <option value="1h"> 1h</option>
                <option value="24h"> 24h</option>
                <option value="7d"> 7d</option>
            </select>
            <div className="currency-container">
                <VerCurrSelect
                    defaultCurrency={verCurr}
                    callback={currency => {
                        let newState = { ...percAlert, verCurr: currency, lastTimeFired: 0 }
                        changeAlert(newState)
                    }}
                />
            </div>
            <div
                className="remove-X clickable"
                onClick={() => {
                    removeAlert(percAlert)
                }}
            >
                ×
            </div>
        </div>
    )
})
