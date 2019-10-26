import React from "react"

export default function About() {
    return (
        <div className="page-container">
            <div id="about">
                <p>Coin Watcher is a free, open source and privacy-oriented cryptocurrency portfolio web app. </p>
                <p> It stores all user data strictly on client side, while market data is provided by public APIs.</p>
                <span>
                    The current APIs are:
                    <ul>
                        <li>
                            <a href="https://www.coingecko.com">coingecko.com</a>
                        </li>
                    </ul>
                </span>
                <p>
                    The official page of the project is at
                    <a href="https://github.com/Tiramisu77/CoinWatcher">https://github.com/Tiramisu77/CoinWatcher</a>
                </p>
            </div>
        </div>
    )
}
