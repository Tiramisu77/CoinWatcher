let stateCompare = {
    portfolio: null,
}

function savePortfolio(portfolio) {
    if (portfolio !== null && portfolio !== undefined) localStorage.setItem("portfolio", JSON.stringify(portfolio))
}

function comparePortfolio(portfolio) {
    if (stateCompare.portfolio !== portfolio) {
        savePortfolio(portfolio)
        stateCompare.portfolio = portfolio
    }
}

export const persistStore = function(store) {
    comparePortfolio(store.portfolio)
}

function loadItem(key, type) {
    return JSON.parse(localStorage.getItem(key) || (type === "arr" ? "[]" : "{}"))
}

export const hydrate = function() {
    let portfolio = loadItem("portfolio", "obj")

    return { portfolio }
}
