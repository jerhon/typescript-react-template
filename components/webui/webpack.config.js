var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    mode: 'development',

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        new CopyWebpackPlugin([{from:'src/index.html', to:'./', flatten:true}])
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },    

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader', "css-loader"] },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader'},
            { test: /\.scss$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]},
            { test: /\.json$/, exclude: /node_modules/,  loader: 'json-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    
    devServer: {
        port:3000,
        proxy: {
            "/api":"http://localhost:3001"
        }
    }
};