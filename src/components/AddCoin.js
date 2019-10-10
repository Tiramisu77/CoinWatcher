import React from "react"
import { connect } from "react-redux"
import { addItem } from "../redux/actions/addItem"
import "./css/AddCoin.css"

class AddCoin extends React.Component {
    constructor(props) {
        super(props)
        this.state = { coin: "", amount: "" }
        this.handleAddItem = this.handleAddItem.bind(this)
    }

    updateCoin(coin) {
        this.setState({ coin })
    }

    updateAmount(amount) {
        this.setState({ amount })
    }

    handleAddItem() {
        this.props.addItem({ id: this.state.coin, amount: this.state.amount })
        this.setState({ coin: "", amount: "" })
    }

    render() {
        return (
            <div className="page-container">
                <div id="AddCoinWindow">
                    <form id="add-coin-form">
                        <div style={{ display: "flex", marginTop: "4px" }}>
                            <span style={{ marginRight: "11px" }}>Name:</span> <span className="full-name" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="add-symbol"> Coin:</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    className="add-inp inp"
                                    type="text"
                                    name="symbol"
                                    id="add-symbol"
                                    onChange={e => this.updateCoin(e.target.value)}
                                    value={this.state.coin}
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
                                {" "}
                                ADD{" "}
                            </div>{" "}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { addItem }
)(AddCoin)
