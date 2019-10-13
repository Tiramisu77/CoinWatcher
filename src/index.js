import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./redux/reducers"
import "./index.css"
import App from "./App"
import { persistStore, hydrate } from "./persistStore"
import { register } from "./register-sw.js"
import "regenerator-runtime/runtime"

const store = createStore(rootReducer, hydrate())
//store.dispatch({type:"SET_VERSUS_CURRENCIES",payload:[1,2,3]})
store.subscribe(() => {
    persistStore(store.getState())
})

window.store = store
register()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
