export default function(state = [], action) {
    switch (action.type) {
        case "SET_SUPPORTED_COINS": {
            const supportedCoins = action.payload
            return supportedCoins
        }
        default:
            return state
    }
}
