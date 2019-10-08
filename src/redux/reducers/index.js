import versusCurrencies from "./versusCurrencies"
import settings from "./settings"
import portfolio from "./portfolio"
import supportedCoins from "./supportedCoins"
import { combineReducers } from "redux"

const todoApp = combineReducers({ versusCurrencies, settings, portfolio, supportedCoins })

export default todoApp
