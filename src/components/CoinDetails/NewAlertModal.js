import React, { useReducer } from "react"
import { connect } from "react-redux"
import VerCurrSelect from "./VerCurrSelect"
import { addAlert } from "../../redux/actions/alerts"
import { createId } from "../../lib"

function NewAlertReducer(state, action) {
    let { type, payload } = action
    switch (type) {
        case "TYPE": {
            return { ...state, type: payload }
        }

        case "PERIOD": {
            return { ...state, period: payload }
        }

        case "VERCURR": {
            return { ...state, verCurr: payload }
        }

        case "PRICE": {
            return { ...state, price: payload }
        }
        default:
            throw new Error("unrecognized action")
    }
}

function NewAlertModal({ currencyId, hide, defaultCurrency, addAlert, allPrices }) {
    const [state, dispatch] = useReducer(NewAlertReducer, {
        type: "price",
        price: 0,
        percChange: 0,
        period: "1h",
        verCurr: defaultCurrency,
    })

    return (
        <div className="add-alert-modal">
            <div>Alert type:</div>
            <select
                className="alert-type"
                onChange={event => {
                    dispatch({ type: "TYPE", payload: event.target.value })
                }}
            >
                <option value="price"> Price</option>
                <option value="perc"> Percentage</option>
            </select>
            {state.type === "price" && (
                <>
                    <label htmlFor="target-alert-inp" className="type-price">
                        Price:
                    </label>
                    <input
                        className="type-price inp"
                        autoComplete="off"
                        type="number"
                        name="amount"
                        id="target-alert-inp"
                        size={16}
                        value={state.price || allPrices[defaultCurrency.toLowerCase()] || 0}
                        onChange={event => {
                            dispatch({ type: "PRICE", payload: Number(event.target.value) })
                        }}
                    />
                </>
            )}
            {state.type === "perc" && (
                <>
                    <label className="type-perc" htmlFor="perc-alert-inp">
                        Percentage change:
                    </label>
                    <input
                        className="type-perc inp"
                        autoComplete="off"
                        type="number"
                        name="amount"
                        id="perc-alert-inp"
                        size={16}
                    />
                </>
            )}
            {state.type === "perc" && (
                <>
                    <div className="type-perc">Period: </div>
                    <select
                        className="period-select type-perc"
                        onChange={event => {
                            dispatch({ type: "PERIOD", payload: event.target.value })
                        }}
                    >
                        <option value="1h"> 1h</option>
                        <option value="24h"> 24h</option>
                        <option value="7d"> 7d</option>
                    </select>
                </>
            )}
            <div>Currency:</div>
            <div className="currency-select-container">
                <VerCurrSelect
                    callback={currency => {
                        dispatch({ type: "VERCURR", payload: currency })
                        dispatch({ type: "PRICE", payload: allPrices[currency.toLowerCase()] || 0 })
                    }}
                    defaultCurrency={defaultCurrency}
                />
            </div>
            <div className="btn cancel" onClick={hide}>
                {" "}
                cancel{" "}
            </div>{" "}
            <div
                className="btn ok"
                onClick={() => {
                    hide()
                    addAlert({ ...state, id: createId(), currencyId })
                }}
            >
                {" "}
                ok{" "}
            </div>
        </div>
    )
}
export default connect(
    (store, ownProps) => {
        let { currencyId } = ownProps
        let allPrices = store.apiData[currencyId] ? store.apiData[currencyId].market_data.current_price : {}
        return { defaultCurrency: store.settings.currentCurrencies[0], allPrices }
    },
    { addAlert }
)(NewAlertModal)
