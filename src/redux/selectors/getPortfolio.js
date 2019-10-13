export default function getPortfolio(store) {
    let { portfolio } = store
    return Object.keys(portfolio).map(key => portfolio[key])
}
