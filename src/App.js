import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Head from "./components/Head"
import Root from "./components/Root"
import FooterButtons from "./components/FooterButtons"
import { AlertSystem } from "./AlertSystem"
import { MarketFetcher } from "./MarketFetcher"

export class App extends React.Component {
    constructor(props) {
        super(props)
    }
    //basename="/CoinWatcher"
    render() {
        return (
            <div id="app">
                <Router>
                    <AlertSystem />
                    <MarketFetcher />
                    <Head />
                    <Root />
                    <FooterButtons />
                </Router>
            </div>
        )
    }
}
