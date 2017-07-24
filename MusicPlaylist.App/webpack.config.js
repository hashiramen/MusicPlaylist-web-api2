'use strict';

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015', 'stage-2']
        }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
