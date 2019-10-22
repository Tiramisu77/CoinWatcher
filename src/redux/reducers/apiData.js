export default function(state = {}, action) {
    switch (action.type) {
        case "SET_API_DATA": {
            const { id, data } = action.payload
            return { ...state, [id]: { ...data } }
        }

        default:
            return state
    }
}
