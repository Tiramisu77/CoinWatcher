import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { addItem } from "../redux/actions/portfolio"
import "./css/AddCoin.css"

class AutoCompleteSuggestion extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div
                className="ticker-autocomplete"
                style={{ display: this.props.show }}
                onClick={event => {
                    this.props.clickHandler(event.target.dataset.val)
                }}
            >
                {this.props.autoCompleteItems.map(item => {
                    return (
                        <div className="autocomplete-item" key={item} data-val={item}>
                            {item}
                        </div>
                    )
                })}
            </div>
        )
    }
}

let timer = null
const INPUT_THROTTLING = 100 //miliseconds
const MAX_AUTOCOMPLETE_ITEMS = 100

class AddCoin extends React.Component {
    constructor(props) {
        super(props)
        this.state = { coin: "", amount: "", fullName: "", showAutoComplete: false, autoCompleteItems: [] }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.showAutoComplete = this.showAutoComplete.bind(this)
        this.hideAutoComplete = this.hideAutoComplete.bind(this)
        this.docClickListener = this.docClickListener.bind(this)
        this.deriveAutoComplete = this.deriveAutoComplete.bind(this)
        this.updateFullName = this.updateFullName.bind(this)
        this.updateCoin = this.updateCoin.bind(this)

        document.addEventListener("click", this.docClickListener)
    }

    updateFullName(str) {
        this.setState({ fullName: this.props.supportedCoins.getNameFromQuery(str) })
    }

    docClickListener() {
        this.hideAutoComplete()
    }

    updateCoin(coin) {
        this.setState({ coin })
        this.updateFullName(coin)
    }

    updateAmount(amount) {
        this.setState({ amount })
    }

    handleAddItem() {
        this.props.addItem({ id: this.props.supportedCoins.getIdFromQuery(this.state.coin), amount: this.state.amount })
        this.setState({ coin: "", amount: "" })
    }

    showAutoComplete() {
        this.setState({ showAutoComplete: true })
    }
    hideAutoComplete() {
        this.setState({ showAutoComplete: false })
    }

    deriveAutoComplete() {
        this.setState(state => {
            return {
                ...state,
                autoCompleteItems: this.props.supportedCoins
                    .getMatchesFromQuery(state.coin)
                    .slice(0, MAX_AUTOCOMPLETE_ITEMS),
            }
        })
    }

    updateAutoComplete() {
        clearTimeout(timer)

        timer = setTimeout(this.deriveAutoComplete, INPUT_THROTTLING)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.docClickListener)
        clearTimeout(timer)
    }

    render() {
        return (
            <div className="page-container">
                <div id="AddCoinWindow">
                    <form id="add-coin-form">
                        <div style={{ display: "flex", marginTop: "4px" }}>
                            <span style={{ marginRight: "11px" }}>Name:</span>{" "}
                            <span className="full-name">{this.state.fullName}</span>
                        </div>

                        <div className="input-container">
                            <label htmlFor="add-symbol"> Coin:</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    className="add-inp inp"
                                    type="text"
                                    name="symbol"
                                    id="add-symbol"
                                    onChange={event => {
                                        this.updateCoin(event.target.value)
                                        this.showAutoComplete()
                                        this.deriveAutoComplete()
                                    }}
                                    value={this.state.coin}
                                />
                                <AutoCompleteSuggestion
                                    show={this.state.showAutoComplete ? "block" : "none"}
                                    autoCompleteItems={this.state.autoCompleteItems}
                                    clickHandler={this.updateCoin}
                                />
                            </div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="add-amount"> Amount:</label>{" "}
                            <input
                                className="add-inp inp"
                                autoComplete="off"
                                type="number"
                                name="amount"
                                id="add-amount"
                                onChange={e => this.updateAmount(e.target.value)}
                                value={this.state.amount}
                            />
                        </div>
                        <div className="message" style={{ color: "red", textAlign: "center" }}>
                            {" "}
                        </div>
                        <div className="confirm-add-container">
                            {" "}
                            <div className="confirm-add btn" onClick={this.handleAddItem}>
                                <Link to={{ pathname: "/" }} className="link-no-decor">
                                    ADD
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    function(store) {
        return { supportedCoins: store.supportedCoins }
    },
    { addItem }
)(AddCoin)
