export default function(state = { priceAlerts: [], percAlerts: [] }, action) {
    switch (action.type) {
        case "ADD_ALERT": {
            const { type } = action.payload
            return { ...state, [`${type}Alerts`]: [...state[`${type}Alerts`], action.payload] }
        }
        case "REMOVE_ALERT": {
            const { type, id } = action.payload
            return { ...state, [`${type}Alerts`]: state[`${type}Alerts`].filter(alert => alert.id !== id) }
        }

        default:
            return state
    }
}
