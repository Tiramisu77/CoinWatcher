import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Head from "./components/Head"
import Root from "./components/Root"
import FooterButtons from "./components/FooterButtons"
import { connect } from "react-redux"

import { setSupportedVerCurr } from "./redux/actions/supportedVerCurr"
import { setSupportedCoins } from "./redux/actions/supportedCoins"
import { setItemApiData } from "./redux/actions/apiData"
import { loadVersusCurrencies, loadSupportedCoins, getItemData } from "./network"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.loadSupportedVerCurr()
        this.loadSupportedCoins()

        this.getMarketData()
    }
    async loadSupportedCoins() {
        let supportedCoins = await loadSupportedCoins()
        this.props.setSupportedCoins(supportedCoins)
    }

    async loadSupportedVerCurr() {
        let verCurr = await loadVersusCurrencies().then(r => r.sort((a, b) => a.localeCompare(b)))
        this.props.setSupportedVerCurr(verCurr)
    }

    async getMarketData() {
        for (let id in this.props.portfolio) {
            getItemData(id).then(data => {
                let { image, market_data, symbol } = data
                this.props.setItemApiData({
                    id,
                    data: { image: image.small, market_data, symbol: symbol.toUpperCase() },
                })
            })
        }
    }

    render() {
        return (
            <div id="app">
                <Router>
                    <Head />
                    <Root />
                    <FooterButtons />
                </Router>
            </div>
        )
    }
}

export default connect(
    state => {
        return { portfolio: state.portfolio }
    },
    { setSupportedVerCurr, setSupportedCoins, setItemApiData }
)(App)
