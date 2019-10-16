import supportedVerCurr from "./supportedVerCurr"
import settings from "./settings"
import portfolio from "./portfolio"
import supportedCoins from "./supportedCoins"
import { combineReducers } from "redux"

const todoApp = combineReducers({ supportedVerCurr, settings, portfolio, supportedCoins })

export default todoApp
