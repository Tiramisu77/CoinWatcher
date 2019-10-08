export default function(state = {}, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const { id, amount } = action.payload
            return { ...state, [id]: { id, amount } }
        }
        case "REMOVE_ITEM": {
            const { id } = action.payload
            const { [id]: _, ...rest } = state
            return rest
        }
        default:
            return state
    }
}
