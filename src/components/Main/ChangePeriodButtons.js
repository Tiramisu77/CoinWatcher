import React from "react"
import { connect } from "react-redux"
import { changePriceChangePeriod } from "../../redux/actions/settings"

function PeriodBtn({ className, text, onClick }) {
    return (
        <div className={className} onClick={onClick}>
            {text}
        </div>
    )
}

class ChangePeriodButtons extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            btns: [
                [
                    { val: "1h", text: "1 hour", clicked: false },
                    { val: "24h", text: "24 hours", clicked: false },
                    { val: "7d", text: "7 days", clicked: false },
                ],
                [
                    { val: "30d", text: "30 days", clicked: false },
                    { val: "60d", text: "60 days", clicked: false },
                    { val: "200d", text: "200 days", clicked: false },
                ],
            ],
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(period) {
        this.setState(state => {
            let btns = state.btns.map(arr =>
                arr.map(item => {
                    if (item.val === period) {
                        this.props.changePriceChangePeriod(period)
                        return { ...item, clicked: true }
                    }

                    if (item.clicked) {
                        return { ...item, clicked: false }
                    }

                    return { ...item }
                })
            )

            return { btns }
        })
    }
    render() {
        return (
            <div id="change-period-buttons">
                {this.state.btns.map((e, i) => {
                    return (
                        <div key={i}>
                            {e.map((btn, i) => {
                                return (
                                    <PeriodBtn
                                        key={i}
                                        text={btn.text}
                                        className={
                                            btn.clicked ? "change-period-btn period-btn-pressed" : "change-period-btn"
                                        }
                                        onClick={() => {
                                            this.handleClick(btn.val)
                                        }}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(
    null,
    { changePriceChangePeriod }
)(ChangePeriodButtons)
