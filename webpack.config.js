const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lens-feature-detection.js',
        library: 'Features',
        libraryTarget: 'var',
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
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
