const settings = {
    version: 1.15,
    portfolioSortedBy: "netvalDsc",
    priceChangePeriod: "24h",
    updateInterval: 5 * 1000 * 60,
    currentCurrencies: ["USD", "BTC"],
}

export default function(state = settings, action) {
    switch (action.type) {
        case "CHANGE_PERIOD": {
            if (!action.payload) return { ...state }
            return { ...state, priceChangePeriod: action.payload }
        }
        case "CHANGE_SYNC_INTERVAL": {
            return { ...state, updateInterval: action.payload }
        }
        case "REMOVE_VERSUS_CURRENCY": {
            return { ...state, currentCurrencies: state.currentCurrencies.filter(e => e !== action.payload) }
        }
        case "ADD_VERSUS_CURRENCY": {
            return { ...state, currentCurrencies: [...state.currentCurrencies, action.payload] }
        }
        case "CHANGE_PORTFOLIO_SORT": {
            return { ...state, portfolioSortedBy: action.payload }
        }

        default:
            return state
    }
}
