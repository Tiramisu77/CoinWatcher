let stateCompare = {
    portfolio: null,
    settings: null,
}

function saveItem(key, val) {
    if (val !== null && val !== undefined) localStorage.setItem(key, JSON.stringify(val))
}

function comparePortfolio(portfolio) {
    if (stateCompare.portfolio !== portfolio) {
        saveItem("portfolio", portfolio)
        stateCompare.portfolio = portfolio
    }
}

function compareSettings(settings) {
    if (stateCompare.settings !== settings) {
        saveItem("settings", settings)
        stateCompare.settings = settings
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
    } else return item
}

export const hydrate = function() {
    let res = {}
    let portfolio = loadItem("portfolio")
    let settings = loadItem("settings")

    res.portfolio = portfolio
    res.settings = settings

    for (let key in res) {
        if (!res[key]) {
            delete res[key]
        }
    }

    return res
}
