import React from "react"
import PortfolioItem from "./PortfolioItem"
import getPortfolio from "../../redux/selectors/getPortfolio"
import { connect } from "react-redux"

const PortfolioView = function({ portfolio }) {
    return (
        <div id="portfolio" className="table">
            {portfolio.map(({ amount, id }) => {
                return <PortfolioItem key={id} amount={amount} id={id} />
            })}
        </div>
    )
}

const mapStateToProps = function(state) {
    const portfolio = getPortfolio(state)
    return { portfolio }
}

export default connect(mapStateToProps)(PortfolioView)
