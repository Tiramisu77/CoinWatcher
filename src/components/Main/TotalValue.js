import React from "react"
import { numToFormattedString } from "../../lib"

function getTotalValues(portfolio) {
    let totalValues = portfolio.reduce((acc, item) => {
        item.values.forEach(values => {
            let { verCurr, value, change } = values
            if (acc[verCurr]) {
                acc[verCurr].value += value
                acc[verCurr].change += change
            } else {
                acc[verCurr] = { value, change, verCurr }
            }
        })
        return acc
    }, {})

    return Object.keys(totalValues)
        .map(key => totalValues[key])
        .map(totallValue => {
            let { value, change } = totallValue
            totallValue.changePerc = (change / (value - change)) * 100 || 0
            return totallValue
        })
}

export default function TotalValue({ portfolio }) {
    let totalValues = getTotalValues(portfolio)

    return (
        <div id="networth">
            {totalValues.map(totalValue => {
                let { value, change, verCurr, changePerc } = totalValue
                let { str: valueStr } = numToFormattedString(value, {
                    type: "currency",
                    currency: verCurr.toUpperCase(),
                })
                let { str: changeStr, color: changeColor } = numToFormattedString(change, {
                    type: "currency",
                    currency: verCurr.toUpperCase(),
                    isChange: true,
                })
                let { str: percStr, color: percColor } = numToFormattedString(changePerc, {
                    type: "percentage",

                    isChange: true,
                })
                return (
                    <div key={verCurr}>
                        <div className="total-val">{valueStr}</div>
                        <div>
                            <span className="net-changes change-perc" style={{ color: percColor }}>
                                {percStr}
                            </span>
                            <span className="net-changes">/</span>
                            <span className="net-changes change-abs" style={{ color: changeColor }}>
                                {changeStr}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
