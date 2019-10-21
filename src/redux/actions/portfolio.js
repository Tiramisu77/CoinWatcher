export const addItem = function(itemAndAmount) {
    return {
        type: "ADD_ITEM",
        payload: itemAndAmount,
    }
}

export const removeItem = function(item) {
    return {
        type: "REMOVE_ITEM",
        payload: item,
    }
}

export const changeAmount = function(itemAndAmount) {
    return {
        type: "CHANGE_AMOUNT",
        payload: itemAndAmount,
    }
}
