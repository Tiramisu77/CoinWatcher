export class SupportedCoins {
    constructor(supportedCoins) {
        this.nameMap = null
        this.idMap = null
        this.symbolMap = null
        this.names = null
        this.symbols = null

        this.initialized = false

        Object.preventExtensions(this)
        this.initizalizeList(supportedCoins)
    }

    initizalizeList(listJSON) {
        let keyValArrId = listJSON.map(item => [item.id, item])
        let keyValArrName = listJSON.map(item => [item.name, item])
        let keyValArrSymbol = listJSON.map(item => [item.symbol, item])
        this.nameMap = new Map(keyValArrId)
        this.idMap = new Map(keyValArrName)
        this.symbolMap = new Map(keyValArrSymbol)
        this.names = Array.from(this.nameMap.keys())
        this.symbols = Array.from(this.symbolMap.keys())
        this.initialized = true
    }

    getMatchesFromQuery(str) {
        if (!this.initialized) return []

        let reg = new RegExp(`^${str}`, "i")

        let names = this.names.filter(name => reg.test(name))
        let symbols = this.symbols.filter(symbol => reg.test(symbol)).map(e => e.toUpperCase())

        return [...new Set([...names, ...symbols])]
    }

    getNameFromQuery(str) {
        if (!this.initialized) return "unknown"

        str = str.toLowerCase()

        if (this.nameMap.has(str)) {
            return this.nameMap.get(str).name
        }
        if (this.symbolMap.has(str)) {
            return this.symbolMap.get(str).name
        }
        return "unknown"
    }

    isInList(id) {
        return this.nameMap.has(id) || this.symbolMap.has(id)
    }

    getIdFromQuery(str) {
        if (!this.initialized) return str

        let q = str.toLowerCase()
        if (this.nameMap.has(q)) {
            return this.nameMap.get(q).id
        }
        if (this.symbolMap.has(q)) {
            return this.symbolMap.get(q).id
        }

        return str
    }
}

export default function(state = new SupportedCoins([]), action) {
    switch (action.type) {
        case "SET_SUPPORTED_COINS": {
            return new SupportedCoins(action.payload)
        }
        default:
            return state
    }
}
