import React from "react"
import PortfolioItem from "./PortfolioItem"

import { connect } from "react-redux"

const Portfolio = function({ portfolio }) {
    return (
        <div id="portfolio" className="table">
            {portfolio.map(({ amount, id }) => {
                return <PortfolioItem key={id} amount={amount} id={id} />
            })}
        </div>
    )
}

const mapStateToProps = function(state) {
    const portfolio = Object.keys(state.portfolio).map(key => state.portfolio[key])
    return { portfolio }
}

export default connect(mapStateToProps)(Portfolio)
