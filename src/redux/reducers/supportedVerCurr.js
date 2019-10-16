export default function(state = [], action) {
    switch (action.type) {
        case "SET_SUPPORTED_VER_CURRENCIES": {
            return action.payload
        }
        default:
            return state
    }
}
