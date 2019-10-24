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

        case "CHANGE_ALERT": {
            const { type } = action.payload
            return {
                ...state,
                [`${type}Alerts`]: state[`${type}Alerts`].map(alert => {
                    if (alert.id !== action.payload.id) {
                        return alert
                    } else {
                        return action.payload
                    }
                }),
            }
        }

        default:
            return state
    }
}
