import React from "react"
import "./css/AppSettings.css"
import { connect } from "react-redux"
import { changeSyncInterval, removeVersusCurrency, addVersusCurrency } from "../redux/actions/settings"
import { Link } from "react-router-dom"

function VersusCurrency({ name, remover }) {
    return (
        <div>
            <span className="versus-curr-name">{name}</span>
            <span className="remove-versus-curr" onClick={remover}>
                x
            </span>
        </div>
    )
}

class VersusCurrencyManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showSelect: false }

        this.showSelect = this.showSelect.bind(this)
        this.hideSelect = this.hideSelect.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.docClickListener = this.docClickListener.bind(this)

        document.addEventListener("click", this.docClickListener)
    }

    docClickListener(event) {
        if (event.target.dataset.val !== "don't hide") this.hideSelect()
    }

    showSelect() {
        this.setState({ showSelect: true })
    }

    hideSelect() {
        this.setState({ showSelect: false })
    }

    onSelect(event) {
        this.props.addVersusCurrency(event.target.dataset.val)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.docClickListener)
    }

    render() {
        return (
            <div id="versus-currencies">
                <div
                    className="custom-select"
                    data-val={"don't hide me"}
                    style={{ display: this.state.showSelect ? "block" : "none" }}
                >
                    {this.props.supportedVerCurr.map(curr => {
                        return (
                            <div key={curr} data-val={curr} onClick={this.onSelect}>
                                {curr}
                            </div>
                        )
                    })}
                </div>
                {this.props.currentCurrencies.map(currency => {
                    return (
                        <VersusCurrency
                            key={currency}
                            name={currency}
                            data-curr={currency}
                            remover={() => {
                                this.props.removeVersusCurrency(currency)
                            }}
                        />
                    )
                })}
                <div id="add-versus-currency" className="btn" data-val="don't hide" onClick={this.showSelect}>
                    ADD
                </div>
            </div>
        )
    }
}

const VersusCurrencyManagerConnected = connect(
    state => {
        return {
            currentCurrencies: state.settings.currentCurrencies,
            supportedVerCurr: state.supportedVerCurr.filter(e => state.settings.currentCurrencies.indexOf(e) === -1),
        }
    },
    { removeVersusCurrency, addVersusCurrency }
)(VersusCurrencyManager)

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.changeSyncInterval(event.target.value)
    }

    render() {
        return (
            <div className="page-container">
                <div id="AppSettings">
                    <div className="settings-item">
                        <span> </span>
                        <span id="about-btn" className="clickable">
                            <Link className="link-no-decor" to="/About">
                                {" "}
                                About{" "}
                            </Link>
                        </span>
                    </div>
                    <div className="settings-item">
                        <span>Sync interval:</span>
                        <span className="setting-item-padder"> </span>
                        <select
                            id="update-interval-select"
                            onChange={this.handleChange}
                            value={this.props.updateInterval}
                        >
                            <option value={2 * 60 * 1000}>2 min</option>
                            <option value={5 * 60 * 1000}>5 min</option>
                            <option value={15 * 60 * 1000}>15 min</option>
                        </select>
                    </div>
                    <div className="settings-item">
                        <span>Versus Currencies:</span>
                        <span className="setting-item-padder"> </span>
                        <VersusCurrencyManagerConnected />
                    </div>
                    <div className="message"> </div>
                </div>
            </div>
        )
    }
}

export default connect(
    store => {
        return { updateInterval: store.settings.updateInterval }
    },
    { changeSyncInterval }
)(Settings)
