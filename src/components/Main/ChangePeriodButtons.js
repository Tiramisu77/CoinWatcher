import React from "react"

export default function ChangePeriodButtons() {
    return (
        <div id="change-period-buttons">
            <div>
                <div className="change-period-btn" data-option="1h">
                    1 hour
                </div>
                <div className="change-period-btn" data-option="24h">
                    24 hours
                </div>
                <div className="change-period-btn" data-option="7d">
                    7 days
                </div>
            </div>
            <div>
                <div className="change-period-btn" data-option="30d">
                    30 days
                </div>
                <div className="change-period-btn" data-option="60d">
                    60 days
                </div>
                <div className="change-period-btn" data-option="200d">
                    200 days
                </div>
            </div>
        </div>
    )
}
