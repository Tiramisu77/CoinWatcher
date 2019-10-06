import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { register } from "./register-sw.js"
import "regenerator-runtime/runtime"

register()
ReactDOM.render(<App />, document.getElementById("root"))
