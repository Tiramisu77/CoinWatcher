export default function(state = {}, action) {
    switch (action.type) {
        case "SET_STRUCTURE": {
            return action.payload
        }

        default:
            return state
    }
}
