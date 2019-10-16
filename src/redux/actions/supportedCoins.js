export const setSupportedCoins = function(supportedCoins) {
    return {
        type: "SET_SUPPORTED_COINS",
        payload: supportedCoins,
    }
}
