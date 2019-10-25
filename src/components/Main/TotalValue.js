import React from "react"
import { numToFormattedString } from "../../lib"
import { ErrorBoundary } from "../ErrorBoundary"

function calculatePortfolioStructure(portfolioFullItems, totalValues) {
    return portfolioFullItems.reduce((acc, item) => {
        let { id, values } = item
        acc[id] = values[0].value / totalValues[values[0].verCurr].value
        return acc
    }, {})
}

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

    let structure = calculatePortfolioStructure(portfolio, totalValues)

    totalValues = Object.keys(totalValues)
        .map(key => totalValues[key])
        .map(totallValue => {
            let { value, change } = totallValue
            totallValue.changePerc = (change / (value - change)) * 100 || 0
            return totallValue
        })

    return { structure, totalValues }
}

export default function TotalValue({ portfolio }) {
    let { totalValues, structure } = getTotalValues(portfolio)

    return (
        <div id="networth">
            {totalValues.map(({ value = 0, change = 0, verCurr = "USD", changePerc = 0 }) => {
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
                        <ErrorBoundary>
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
                        </ErrorBoundary>
                    </div>
                )
            })}
        </div>
    )
}
