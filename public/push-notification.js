self.addEventListener("notificationclick", function(event) {
    event.notification.close()

    event.waitUntil(
        clients
            .matchAll({
                type: "window",
            })
            .then(function(clientList) {
                for (let i = 0; i < clientList.length; i++) {
                    let client = clientList[i]
                    if ("focus" in client) return client.focus()
                }
                if (clients.openWindow) return clients.openWindow("/CoinWatcher/")
            })
    )
})
