import supportedVerCurr from "./supportedVerCurr"
import settings from "./settings"
import portfolio from "./portfolio"
import supportedCoins from "./supportedCoins"
import apiData from "./apiData"
import alerts from "./alerts"
import portfolioStructure from "./portfolioStructure"
import activeRequests from "./activeRequests"
import { combineReducers } from "redux"

export default combineReducers({
    supportedVerCurr,
    settings,
    portfolio,
    supportedCoins,
    apiData,
    alerts,
    portfolioStructure,
    activeRequests,
})
