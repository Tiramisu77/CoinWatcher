export default function(state = 0, action) {
    switch (action.type) {
        case "INCREMENT_REQS": {
            return state + 1
        }
        case "DECREMENT_REQS": {
            return state - 1
        }

        default:
            return state
    }
}
