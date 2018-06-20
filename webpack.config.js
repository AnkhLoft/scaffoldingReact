const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // this indicate what file extensions should be transformed with babel
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // Here we specify what module loader we will use to transform the files
                options: { presets: ['env'] }
            },
            {
                test: /\.css$/, // If we were using some kind of css pre-or-post processing we should specify here
                use: [ 'style-loader', 'css-loader' ] // What loaders we want to use to transform our css files
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] }, // This allow us to import modules without needing to add their extensions
    output: { // The output object tells webpack where our bundled code should go in
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",// The specific path where our bundle code should go in, and also specify to the webpack dev server where to serve files from[Note: 404 will be thrown if the is set incorrectly]
        filename: "bundle.js"
    },
    devServer: { // Settings of webpack-dev-server
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/", // Tell webpack-dev-server where our bundled code his
        hotOnly: true //Every time a change is detected the webpback dev server refreshes
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
};