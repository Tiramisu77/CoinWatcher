import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"
import "./index.css"
import { App } from "./App"
import { hydrate, persistStoreMiddleware } from "./persistStore"
import { register } from "./register-sw.js"
import "regenerator-runtime/runtime"

const store = createStore(rootReducer, hydrate(), applyMiddleware(persistStoreMiddleware))

window.store = store
register()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
