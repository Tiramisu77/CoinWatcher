import React from "react"
import { Switch, Route } from "react-router-dom"

import Main from "./Main/"
import AddCoin from "./AddCoin"
import CoinDetails from "./CoinDetails"
import Settings from "./Settings"
import About from "./About"

export default function Root() {
    return (
        <div id="app-root">
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/AddCoin">
                    <AddCoin />
                </Route>
                <Route path="/CoinDetails">
                    <CoinDetails />
                </Route>
                <Route path="/Settings">
                    <Settings />
                </Route>
                <Route path="/About">
                    <About />
                </Route>
            </Switch>
        </div>
    )
}
