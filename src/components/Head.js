import React from "react"

export default function Head() {
    return (
        <div id="apphead" style={{ display: "grid", gridTemplateColumns: "60px 1fr 60px" }}>
            <div id="head-left" />
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
