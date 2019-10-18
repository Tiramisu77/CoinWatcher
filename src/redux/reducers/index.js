import supportedVerCurr from "./supportedVerCurr"
import settings from "./settings"
import portfolio from "./portfolio"
import supportedCoins from "./supportedCoins"
import apiData from "./apiData"
import { combineReducers } from "redux"

const todoApp = combineReducers({ supportedVerCurr, settings, portfolio, supportedCoins, apiData })

export default todoApp
