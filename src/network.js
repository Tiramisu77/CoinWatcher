const isNonEmptyStr = function(str) {
    return typeof str === "string" ? (str.length > 0 ? true : false) : false
}

const validateListItem = function(listItem) {
    let { id, symbol, name } = listItem
    let res = isNonEmptyStr(id) && isNonEmptyStr(symbol) && isNonEmptyStr(name)
    if (res === false) {
        if (window.DEBUG) console.warn(`Malformed coinList data @ ${listItem}`)
        return null
    }
    return listItem
}

export const getItemData = async id => {
    return fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    ).then(response => {
        if (response.ok) return response.json()
        else return Promise.reject(response.status)
    })
}

export const loadSupportedCoins = async function() {
    try {
        let res = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then(response => {
            if (response.ok) return response.json()
            else return Promise.reject(response.status)
        })
        res = res.map(validateListItem).filter(e => e !== null)
        return res
    } catch (error) {
        if (window.DEBUG) console.error(error)
        return Promise.reject(error)
    }
}

export const loadVersusCurrencies = async function() {
    return fetch(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`).then(response => {
        if (response.ok) return response.json().then(r => r.map(e => e.toUpperCase()))
        else return Promise.reject(response.status)
    })
}
