import React from "react"
import { connect } from "react-redux"
import { changePriceChangePeriod } from "../../redux/actions/settings"

function PeriodBtn({ className, text, val }) {
    return (
        <div className={className} data-val={val}>
            {text}
        </div>
    )
}

class ChangePeriodButtons extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(period) {
        this.props.changePriceChangePeriod(period)
    }
    render() {
        return (
            <div
                id="change-period-buttons"
                onClick={event => {
                    this.handleClick(event.target.dataset.val)
                    //  event.target.class
                }}
            >
                <div>
                    <PeriodBtn
                        text={"1 hour"}
                        val={"1h"}
                        className={
                            this.props.changePeriod === "1h"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                    <PeriodBtn
                        text={"24 hours"}
                        val={"24h"}
                        className={
                            this.props.changePeriod === "24h"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                    <PeriodBtn
                        text={"7 days"}
                        val={"7d"}
                        className={
                            this.props.changePeriod === "7d"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                </div>

                <div>
                    <PeriodBtn
                        text={"30 days"}
                        val={"30d"}
                        className={
                            this.props.changePeriod === "30d"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                    <PeriodBtn
                        text={"60 days"}
                        val={"60d"}
                        className={
                            this.props.changePeriod === "60d"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                    <PeriodBtn
                        text={"200 days"}
                        val={"200d"}
                        className={
                            this.props.changePeriod === "200d"
                                ? "change-period-btn period-btn-pressed"
                                : "change-period-btn"
                        }
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    const changePeriod = store.settings.priceChangePeriod
    return { changePeriod }
}

export default connect(
    mapStateToProps,
    { changePriceChangePeriod }
)(ChangePeriodButtons)
