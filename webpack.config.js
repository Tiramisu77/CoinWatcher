/* eslint-env node */

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { GenerateSW } = require("workbox-webpack-plugin")

let htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
})

let copyPlugin = new CopyPlugin([
    { from: "./public/images", to: "images" },
    { from: "./public/manifest.json", to: "" },
    { from: "./public/push-notification.js", to: "" },
])

let workboxPlugin = new GenerateSW({
    importWorkboxFrom: "local",
    skipWaiting: true,
    importScripts: ["./push-notification.js"],
    runtimeCaching: [
        {
            urlPattern: /https:\/\/api.coingecko.com\/api\/v3\/coins\/list|https:\/\/api.coingecko.com\/api\/v3\/simple\/supported_vs_currencies/,
            handler: "CacheFirst",
            options: {
                cacheName: "coinwatcher-coingecko-v3-lists",

                expiration: {
                    maxAgeSeconds: 60 * 60 * 24,
                },

                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        {
            urlPattern: new RegExp("(https://api.coingecko.com/api/v3/coins/)(?!list)"),
            handler: "NetworkFirst",
            options: {
                cacheName: "coinwatcher-coingecko-v3-coins",

                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
    ],
})

module.exports = function(env) {
    let plugins = env === "production" ? [htmlPlugin, copyPlugin, workboxPlugin] : [htmlPlugin, copyPlugin]

    return {
        entry: { app: "./src/index.js" },
        watch: false,
        watchOptions: {
            aggregateTimeout: 1300,
            ignored: /node_modules/,
        },
        plugins,

        mode: env,
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "build"),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        resolve: {
            alias: {
                "@app": path.resolve(__dirname, "src/"),
            },
        },
    }
}
