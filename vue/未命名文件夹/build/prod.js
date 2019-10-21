const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const argv = require('yargs').argv;
const baseWebpackConfig = require('./base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const config = require('./config.js');

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

let prodMode = argv.mode === 'production';
let prodConfig = webpackMerge(baseWebpackConfig, {
    entry: config.entries,
    output: {
        path: config.distRootPath,
        publicPath: config.absolutePath,
        filename: 'js/[name].[chunkhash:7].js'
    },
    devtool: prodMode ? '' : 'source-map',
    stats: {
        colors: true,
        chunks: false,
        children: false,
        entrypoints: false,
        modules: false
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 10 versions']
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {},
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ManifestPlugin({
            publicPath: '',
            filter: function (FileDescriptor) {
                return FileDescriptor.isChunk;
            }
        })
    ]
});

if (prodMode) {
    prodConfig.optimization.minimizer = [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: false
        }),
        new UglifyJsPlugin({
            test: /\.js$/,
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: {
                    drop_debugger: true,
                    drop_console: true,
                    unused: false
                }
            }
        })
    ];
}

let pages = Object.keys(config.entries);
pages.forEach(item => {
    if (item !== 'framework') {
        prodConfig.plugins.push(new HtmlWebpackPlugin({
            filename: resolvePath(`dist/pages/${item}.html`),
            template: resolvePath(`src/pages/${item}.ejs`),
            heads: ['framework'],
            bodys: [item],
            chunks: ['framework', item],
            inject: false
        }));
    }
});

module.exports = prodConfig;
