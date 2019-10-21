const path = require('path');
const webpackMerge = require('webpack-merge');
const open = require('open');
const baseConfig = require('./base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const config = require('./config.js');

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

let devConfig = webpackMerge(baseConfig, {
    entry: config.entries,
    output: {
        path: config.distRootPath,
        publicPath: config.publicPath,
        filename: 'js/[name].[hash:7].js'
    },
    devServer: {
        host: '::',
        contentBase: config.distRootPath,
        watchContentBase: true,
        disableHostCheck: true,
        compress: true,
        port: config.server.port,
        overlay: {
            warnings: false,
            errors: true
        },
        stats: {
            colors: true,
            chunks: false,
            children: false,
            entrypoints: false,
            modules: false
        },
        before: function (app, server) {
            app.get('/', (req, res) => {
                var resHtml = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>index</title>
                </head>
                <body>
                    <ul>`;
                for (let key in config.entries) {
                    if (key !== 'framework') {
                        resHtml += `<li><a href="pages/${key}.html">pages/${key}.html</a></li>`;
                    }
                }
                resHtml += `</ul>
                </body>
                </html>`;
                res.send(resHtml);
            });

            const chokidar = require('chokidar');
            const files = [
                path.join(__dirname, '../src/pages/**/*.ejs'),
                path.join(__dirname, '../src/pages/**/*.vue')
            ];
            const options = {
                followSymlinks: false,
                depth: 5
            };
            let watcher = chokidar.watch(files, options);

            watcher.on('all', _ => {
                server.sockWrite(server.sockets, 'content-changed');
            });
        },
        after: function () {
            open(`http://localhost:${config.server.port}`);
        }
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    'vue-style-loader',
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
            },
            {
                test: /\.(vue|js)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: 'happypack/loader?id=jseslint'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HappyPack({
            id: 'jseslint',
            loaders: [
                'eslint-loader?cacheDirectory=true'
            ],
            threadPool: happyThreadPool,
            verbose: true
        })
    ]
});

// 根据对应入口文件生成html文件
let pages = Object.keys(config.entries);
pages.forEach(item => {
    if (item !== 'framework') {
        devConfig.plugins.push(new HtmlWebpackPlugin({
            filename: resolvePath(`dist/pages/${item}.html`),
            template: resolvePath(`src/pages/${item}.ejs`),
            heads: ['framework'],
            bodys: [item],
            chunks: ['framework', item],
            inject: false
        }));
    }
});

module.exports = devConfig;
