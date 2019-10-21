const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
let entries = (() => {
    let filesPath = glob.sync(getPath('src') + '/**/*.js');
    let entry = {};
    filesPath.forEach(item => {
        entry[path.relative(getPath('src'), item).replace('.js', '')] = item;
    });
    return entry;
})();
let prodConfig = {
    entry: entries,
    stats: {
        children: false,
        modules: false,
        entrypoints: false
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ]
};
module.exports = prodConfig;