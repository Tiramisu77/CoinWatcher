import React, { useState } from "react"
import { connect } from "react-redux"

function VerCurrSelect({ callback, supportedVerCurr, defaultCurrency }) {
    const [currency, setCurrency] = useState(null)
    return (
        <select
            className="currency-select"
            value={currency || defaultCurrency}
            onChange={event => {
                setCurrency(event.target.value)
                callback(event.target.value)
            }}
        >
            {supportedVerCurr.map(curr => {
                return (
                    <option key={curr} value={curr}>
                        {curr}
                    </option>
                )
            })}
        </select>
    )
}

export default connect(store => {
    return { supportedVerCurr: store.supportedVerCurr }
})(VerCurrSelect)
