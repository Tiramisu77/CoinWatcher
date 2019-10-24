const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
    entry: { app: "./src/index.js" },
    watch: false,
    watchOptions: {
        aggregateTimeout: 1300,
        ignored: /node_modules/,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new CopyPlugin([
            { from: "./src/service-worker.js", to: "" },
            { from: "./public/images", to: "images" },
            { from: "./public/manifest.json", to: "" },
        ]),
    ],

    mode: "development",
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
}
