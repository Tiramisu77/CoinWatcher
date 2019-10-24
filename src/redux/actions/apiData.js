export const setItemApiData = function({ id, data: rawData }) {
    let { image, market_data, symbol, market_cap_rank, name } = rawData

    let data = { image: image.small, market_data, symbol: symbol.toUpperCase(), market_cap_rank, name }
    return {
        type: "SET_API_DATA",
        payload: { id, data },
    }
}
