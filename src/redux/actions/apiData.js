export const setItemApiData = function({ id, data }) {
    return {
        type: "SET_API_DATA",
        payload: { id, data },
    }
}
