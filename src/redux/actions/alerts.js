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

export const changeAlert = function(alert){
  return {
      type: "CHANGE_ALERT",
      payload: alert,
  }
}
