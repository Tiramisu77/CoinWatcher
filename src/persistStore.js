let oldStore = {
    portfolio: null,
    settings: null,
}

function saveItem(key, val) {
    if (val !== null && val !== undefined) localStorage.setItem(key, JSON.stringify(val))
}

function comparePortfolio(portfolio) {
    if (oldStore.portfolio !== portfolio) {
        saveItem("portfolio", portfolio)
        oldStore.portfolio = portfolio
    }
}

function compareSettings(settings) {
    if (oldStore.settings !== settings) {
        saveItem("settings", settings)
        oldStore.settings = settings
    }
}

export const persistStore = function(store) {
    let { portfolio, settings } = store
    comparePortfolio(portfolio)
    compareSettings(settings)
}

function loadItem(key) {
    let item = localStorage.getItem(key)
    if (item) {
        return JSON.parse(item)
    } else return undefined
}

export const hydrate = function() {
    return { portfolio: loadItem("portfolio"), settings: loadItem("settings") }
}
