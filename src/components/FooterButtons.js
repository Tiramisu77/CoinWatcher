import React from "react"
import { Link } from "react-router-dom"

export default function FooterButtons() {
    return (
        <div id="footer-buttons">
            <div style={{ justifyContent: "flex-start" }}>
                <Link to="/">
                    <svg
                        id="home-button"
                        className="footer-button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 27 27"
                    >
                        <path
                            className="svgbody"
                            d="M3.7 24.9c0 0 0 0.6 0.6 0.6 0.7 0 6.8 0 6.8 0l0-5.6c0 0-0.1-0.9 0.8-0.9h2.8c1.1 0 1 0.9 1 0.9l0 5.6c0 0 5.8 0 6.7 0 0.7 0 0.7-0.8 0.7-0.8V14.4l-9.4-8.4 -10 8.4C3.7 14.4 3.7 24.9 3.7 24.9z"
                        />
                        <path
                            className="svgbody"
                            d="M0 13.6c0 0 0.8 1.6 2.7 0l11-9.3 10.3 9.3c2.1 1.5 2.9 0 2.9 0L13.7 1.5 0 13.6z"
                        />
                        <polygon points="23.8 4.3 21.2 4.3 21.2 7.5 23.8 9.8 " className="svgbody" />
                    </svg>
                </Link>
            </div>

            <div style={{ justifyContent: "center" }}>
                <Link to="/AddCoin">
                    <svg
                        className="footer-button"
                        id="add-coin"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 292.4 292.4"
                    >
                        <path
                            className="svgbody"
                            d="M146.2 0C65.6 0 0 65.6 0 146.2s65.6 146.2 146.2 146.2 146.2-65.6 146.2-146.2S226.8 0 146.2 0zM195 152.2h-42.8v42.8c0 3.3-2.7 6-6 6 -3.3 0-6-2.7-6-6v-42.8H97.4c-3.3 0-6-2.7-6-6s2.7-6 6-6h42.8V97.4c0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6v42.8h42.8c3.3 0 6 2.7 6 6S198.3 152.2 195 152.2z"
                            fill="#010002"
                        />
                    </svg>
                </Link>
            </div>

            <div style={{ justifyContent: "flex-end" }}>
                <Link to="/Settings">
                    <svg
                        className="footer-button"
                        id="settings-button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 1000"
                    >
                        <metadata> Svg Vector Icons : http:&#x2F;&#x2F;www.onlinewebfonts.com&#x2F;icon </metadata>
                        <path
                            className="svgbody"
                            d="M227.3 79.7l142.8-63.6 45.6 102.3c49.7-11 100.1-12 148.6-3.9L604.4 10l145.9 56 -40.1 104.6c41.5 26.4 78.3 60.8 107.8 102.3l102.3-45.6 63.6 142.8 -102.3 45.6c11 49.7 12 100.1 3.9 148.6L990 604.4l-56 145.9 -104.6-40.1C803 751.6 768.6 788.5 727.1 818l45.6 102.3 -142.8 63.6 -45.6-102.3c-49.7 11-100.1 12-148.6 3.9L395.6 990l-145.9-56 40.2-104.6C248.4 803 211.5 768.6 182 727.1L79.7 772.7 16.1 629.9l102.3-45.6c-11-49.7-12-100.1-3.9-148.6L10 395.6l56-145.9 104.6 40.1c26.4-41.5 60.8-78.3 102.3-107.8L227.3 79.7zM404.7 285.9c-118.3 52.7-171.5 191.2-118.8 309.5 52.7 118.3 191.2 171.5 309.5 118.8 118.3-52.7 171.5-191.2 118.8-309.5C661.5 286.4 522.9 233.2 404.7 285.9z"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
