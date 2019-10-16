import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Head from "./components/Head"
import Root from "./components/Root"
import FooterButtons from "./components/FooterButtons"
import { connect } from "react-redux"

import { setSupportedVerCurr } from "./redux/actions/supportedVerCurr"
import { setSupportedCoins } from "./redux/actions/supportedCoins"
import { loadVersusCurrencies, loadSupportedCoins } from "./network"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.loadSupportedVerCurr()
        this.loadSupportedCoins()
    }
    async loadSupportedCoins() {
        let supportedCoins = await loadSupportedCoins()
        this.props.setSupportedCoins(supportedCoins)
    }

    async loadSupportedVerCurr() {
        let verCurr = await loadVersusCurrencies()
        this.props.setSupportedVerCurr(verCurr)
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
    null,
    { setSupportedVerCurr, setSupportedCoins }
)(App)
