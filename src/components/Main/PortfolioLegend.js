import React from "react"

export default function PortfolioLegend() {
    return (
        <div className="legend-container">
            <div className="table-row legend">
                <div className="table-cell">
                    {" "}
                    <span className="coinL">coin ⇵</span>
                </div>
                <div className="table-cell">
                    <span className="pricesL"> prices ⇵</span>
                </div>
                <div className="table-cell">
                    <span className=" valueL">value ⇵ </span>
                </div>
            </div>
        </div>
    )
}
