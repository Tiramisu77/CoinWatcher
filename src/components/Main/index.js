import React from "react"
import "./main.css"

import TotalValue from "./TotalValue"
import PortfolioLegend from "./PortfolioLegend"

import Portfolio from "./Portfolio"

import ChangePeriodButtons from "./ChangePeriodButtons"

export default function Main() {
    return (
        <div id="main">
            <TotalValue />
            <PortfolioLegend />
            <Portfolio />
            <ChangePeriodButtons />
        </div>
    )
}
