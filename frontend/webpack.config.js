const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    entry: "./src/app.js",
    mode: "development",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/templates", to: "templates" },
                { from: "src/static/images", to: "images" },
                { from: "node_modules/@fortawesome/fontawesome-free/webfonts", to: "webfonts" },
                { from: "node_modules/chart.js/dist/chart.umd.js", to: "js" },

            ],
        }),
    ],

}