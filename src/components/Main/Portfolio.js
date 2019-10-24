import React from "react"
import PortfolioItem from "./PortfolioItem"
import { Link } from "react-router-dom"
import { ErrorBoundary } from "../ErrorBoundary"
export default function Portfolio({ portfolio }) {
    return (
        <div id="portfolio" className="table">
            {portfolio.map(item => {
                let { amount, id, image, symbol, prices, values } = item
                return (
                    <Link key={id} to={{ pathname: "/CoinDetails", state: { id } }} className="link-no-decor">
                        <ErrorBoundary>
                            <PortfolioItem
                                amount={amount}
                                id={id}
                                image={image}
                                symbol={symbol}
                                prices={prices}
                                values={values}
                            />
                        </ErrorBoundary>
                    </Link>
                )
            })}
        </div>
    )
}
