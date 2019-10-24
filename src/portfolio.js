export default function(state = {}, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const { id, amount } = action.payload
            return { ...state, [id]: { id, amount: Number(amount) } }
        }
        case "REMOVE_ITEM": {
            const id = action.payload
            const { [id]: _, ...rest } = state
            return rest
        }
        case "CHANGE_AMOUNT": {
            const { id, amount } = action.payload
            return { ...state, [id]: { id, amount: Number(amount) } }
        }
        default:
            return state
    }
}
