import React from "react"
import PortfolioItem from "./PortfolioItem"

export default function Portfolio({ portfolio }) {
    return (
        <div id="portfolio" className="table">
            {portfolio.map(({ amount, id, image, symbol, prices, values }) => {
                return (
                    <PortfolioItem
                        key={id}
                        amount={amount}
                        id={id}
                        image={image}
                        symbol={symbol}
                        prices={prices}
                        values={values}
                    />
                )
            })}
        </div>
    )
}
