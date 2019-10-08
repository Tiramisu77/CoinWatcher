export default function(state = [], action) {
    switch (action.type) {
        case "SET_VERSUS_CURRENCIES": {
            const versusCurrencies = action.payload
            return versusCurrencies
        }
        default:
            return state
    }
}
