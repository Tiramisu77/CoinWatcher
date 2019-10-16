export const changePriceChangePeriod = function(period) {
    return {
        type: "CHANGE_PERIOD",
        payload: period,
    }
}

export const changeSyncInterval = function(interval) {
    return {
        type: "CHANGE_SYNC_INTERVAL",
        payload: Number(interval) * 1000 * 60,
    }
}

export const removeVersusCurrency = function(currency) {
    return {
        type: "REMOVE_VERSUS_CURRENCY",
        payload: currency,
    }
}

export const addVersusCurrency = function(currency) {
    return {
        type: "ADD_VERSUS_CURRENCY",
        payload: currency,
    }
}
