const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'feature-detection.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'featureDetection',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
