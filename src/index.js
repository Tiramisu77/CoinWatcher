import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./redux/reducers"
import "./index.css"
import { App } from "./App"
import { hydrate, persistStoreMiddleware } from "./persistStore"
import { register } from "./register-sw.js"
import "regenerator-runtime/runtime"

let composeEnhancers

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
    })
} else {
    composeEnhancers = compose
}

const enhancer = composeEnhancers(applyMiddleware(persistStoreMiddleware))

const store = createStore(rootReducer, hydrate(), enhancer)

window.store = store
register()

//todo  tip when portfolio is empty, charts

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

//create random portfolio
window.randomPortfolio = function(num) {
    let allId = [...store.getState().supportedCoins.idMap].map(e => e[1].id)
    let res = {}
    for (let i = 0; i < num; i++) {
        let id = allId[Math.floor(Math.random() * allId.length)]
        res[id] = { id, amount: Math.random() * (100 * Math.random()) }
    }

    localStorage.setItem("portfolio", JSON.stringify(res))
}
