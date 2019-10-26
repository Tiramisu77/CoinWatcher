import React from "react"
import { connect } from "react-redux"
import "./css/Spinner.css"
function Spinner({ activeRequests }) {
    return (
        <div id="floatingBarsG" style={{ display: activeRequests ? "block" : "none" }}>
            <div className="blockG" id="rotateG_01" />
            <div className="blockG" id="rotateG_02" />
            <div className="blockG" id="rotateG_03" />
            <div className="blockG" id="rotateG_04" />
            <div className="blockG" id="rotateG_05" />
            <div className="blockG" id="rotateG_06" />
            <div className="blockG" id="rotateG_07" />
            <div className="blockG" id="rotateG_08" />
        </div>
    )
}

function Head({ activeRequests }) {
    return (
        <div id="apphead" style={{ display: "grid", gridTemplateColumns: "60px 1fr 60px" }}>
            <div id="head-left">
                <Spinner activeRequests={activeRequests} />
            </div>
            <div id="head-center" style={{ justifySelf: "center" }}>
                <span id="head-message" />

                <span id="hide-message-btn" style={{ visibility: "hidden" }}>
                    ╳
                </span>
            </div>
            <div id="head-right" />
        </div>
    )
}

export default connect(store => {
    return { activeRequests: store.activeRequests }
})(Head)
