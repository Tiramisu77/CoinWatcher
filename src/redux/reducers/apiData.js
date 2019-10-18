export default function(state = {}, action) {
    switch (action.type) {
        case "SET_ITEM": {
            const { id, data } = action.payload
            return { ...state, [id]: { ...data } }
        }

        default:
            return state
    }
}
