export function register() {
    try {
        navigator.serviceWorker.register("service-worker.js")
    } catch (e) {
        let msg = document.createElement("div")
        msg.textContent = "Critical Error: failed to register service worker"
        console.error(e)
        document.querySelector("body").prepend(msg)
        throw e
    }
}
