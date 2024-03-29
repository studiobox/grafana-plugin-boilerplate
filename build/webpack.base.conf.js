const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    target: "node",
    context: resolve('src'),
    entry: './module.ts',
    output: {
        filename: 'module.js',
        path: resolve('dist'),
        libraryTarget: 'amd'
    },
    externals: [
        // remove the line below if you don't want to use buildin versions
        'lodash', 'moment', 'angular',
        function (context, request, callback) {
            var prefix = 'grafana/';
            if (request.indexOf(prefix) === 0) {
                return callback(null, request.substr(prefix.length));
            }
            callback();
        }
    ],
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([{
                from: 'plugin.json'
            },
            {
                from: 'README.md'
            },
            {
                from: 'css/*'
            },
            {
                from: '*/*.html'
            },
            {
                from: 'assets/*'
            }
        ])
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: [
                    // TODO: check if need babel-loader
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    }
}