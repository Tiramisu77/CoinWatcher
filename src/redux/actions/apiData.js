export const setItemApiData = function({ id, data }) {
    return {
        type: "SET_ITEM",
        payload: { id, data },
    }
}
