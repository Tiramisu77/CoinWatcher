import React from "react"

export const Bell = function() {
    return (
        <svg className="alert-bell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459.3 459.3">
            <path
                className="svgbody"
                d="M175.2 404.5c0 0.1 0 0.2 0 0.4 0 30.1 24.4 54.5 54.5 54.5s54.5-24.4 54.5-54.5c0-0.1 0-0.2 0-0.4H175.2z"
            />
            <path
                className="svgbody"
                d="M403.5 336.4l-49-72c0-22 0-75.9 0-89.8 0-60.6-43.1-111.1-100.4-122.5V24.5C254.2 11 243.2 0 229.7 0s-24.5 11-24.5 24.5v27.7c-57.2 11.4-100.4 61.9-100.4 122.5 0 23.7 0 76.1 0 89.8l-49 72c-5.2 7.6-5.7 17.4-1.4 25.5 4.3 8.1 12.7 13.2 21.9 13.2H383.1c9.2 0 17.6-5.1 21.9-13.2C409.3 353.8 408.7 344 403.5 336.4z"
            />
        </svg>
    )
}

export const Trashcan = function() {
    return (
        <svg className="trashcan clickable" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
            <path
                className="svgbody"
                d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
            />
        </svg>
    )
}
