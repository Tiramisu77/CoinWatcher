import React from "react"

export default function PortfolioItem({ id, amount }) {
    return (
        <div className="table-row">
            <div className="table-cell ticker-container">
                <div className="l-t-a">
                    <img className="coin-logo" alt="" />
                    <div className="ticker">{id}</div>
                    <div className="amount">{amount}</div>
                </div>
            </div>

            <div className="table-cell item-prices">
                <div className="usd-price" />
                <div className="change-usd" />
                <div className="btc-price" />
                <div className="change-btc" />
            </div>

            <div className="table-cell item-values">
                <div className="netUSD" />
                <div className="net-usd-change"> </div>
                <div className="net-btc" />
                <div className="net-btc-change"> </div>
            </div>
        </div>
    )
}
