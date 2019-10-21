import React from "react"
import { numToFormattedString } from "../../lib"

export default function PortfolioItem({ id, amount, image, symbol, prices, values }) {
    return (
        <div className="table-row">
            <div className="table-cell ticker-container">
                <div className="l-t-a">
                    <img className="coin-logo" src={image} style={{ display: image ? "block" : "none" }} />
                    <div className="ticker">{symbol ? symbol : id}</div>
                    <div className="amount">{amount}</div>
                </div>
            </div>

            <div className="table-cell item-prices">
                {prices.map(e => {
                    let { verCurr, price, change } = e
                    let { str: priceStr } = numToFormattedString(price, {
                        type: "currency",
                        currency: verCurr.toUpperCase(),
                    })

                    let { str: changeStr, color } = numToFormattedString(change, { type: "percentage", isChange: true })

                    return (
                        <div key={verCurr} className="table-cell">
                            <div>{priceStr}</div>
                            <div style={{ color }}>{changeStr} </div>
                        </div>
                    )
                })}
            </div>

            <div className="table-cell item-values">
                {values.map(e => {
                    let { verCurr, value, change } = e
                    let { str: valueStr } = numToFormattedString(value, {
                        type: "currency",
                        currency: verCurr.toUpperCase(),
                    })

                    let { str: changeStr, color } = numToFormattedString(change, {
                        type: "currency",
                        currency: verCurr.toUpperCase(),
                        isChange: true,
                    })

                    return (
                        <div key={verCurr} className="table-cell">
                            <div>{valueStr}</div>
                            <div style={{ color }}>{changeStr} </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
