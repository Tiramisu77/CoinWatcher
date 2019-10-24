export const register = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js").then(
            function(reg) {
                console.info("Service worker registered")
                reg.addEventListener("updatefound", () => {
                    window.location.reload()
                })
            },
            function(error) {
                if (window.DEBUG) console.error("Service worker registration failed:", error)
            }
        )
    } else {
        console.error("Service workers are not supported.")
    }
}
