const settings = {
    version: 1.14,
    portfolioSortedBy: "netvalDsc",
    priceChangePeriod: "24h",
    updateInterval: 5 * 1000 * 60,
    totalValSnapshotInterval: 1000 * 60 * 10,
    apiList: ["coingecko"],
    networkMode: "single",
    colorScheme: {
        current: "default",
        default: {
            "--page-bg-color": "#590E79",
            "--main-color": "#3e1350",
            "---secondary-color": "#091919",
            "--main-font-color": "#d3dbe6",
        },
        custom: {
            "--page-bg-color": "#590E79",
            "--main-color": "#3e1350",
            "---secondary-color": "#091919",
            "--main-font-color": "#d3dbe6",
        },
    },

    currentCurrencies: {
        main: "USD",
        second: "BTC",
    },
}

export default function(state = settings, action) {
    switch (action.type) {
        case "": {
            return 1
        }
        default:
            return state
    }
}
