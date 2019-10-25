import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"
import "./index.css"
import { App } from "./App"
import { hydrate, persistStoreMiddleware, compose } from "./persistStore"
import { register } from "./register-sw.js"
import "regenerator-runtime/runtime"

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose

const enhancer = composeEnhancers(
    applyMiddleware(persistStoreMiddleware)
    // other store enhancers if any
)

const store = createStore(rootReducer, hydrate(), enhancer)

window.store = store
register()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
