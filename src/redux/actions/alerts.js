export const addAlert = function(alert) {
    return {
        type: "ADD_ALERT",
        payload: alert,
    }
}

export const removeAlert = function(alert) {
    return {
        type: "REMOVE_ALERT",
        payload: alert,
    }
}
