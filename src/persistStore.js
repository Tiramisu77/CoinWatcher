import { debounce } from "./lib"

let oldStore = {
    portfolio: null,
    settings: null,
    alerts: null,
}

function saveItem(key, val) {
    if (val !== null && val !== undefined) localStorage.setItem(key, JSON.stringify(val))
}

function comparator(key, value) {
    if (oldStore[key] !== value) {
        saveItem(key, value)
        oldStore[key] = value
    }
}

const persistStore = debounce(function(store) {
    let { portfolio, settings, alerts } = store
    comparator("portfolio", portfolio)
    comparator("settings", settings)
    comparator("alerts", alerts)
}, 3000)

export const persistStoreMiddleware = function({ getState }) {
    return next => action => {
        const returnValue = next(action)
        persistStore(getState())
        return returnValue
    }
}

function loadItem(key) {
    let item = localStorage.getItem(key)
    if (item) {
        return JSON.parse(item)
    } else return undefined
}

export const hydrate = function() {
    return { portfolio: loadItem("portfolio"), settings: loadItem("settings"), alerts: loadItem("alerts") }
}
