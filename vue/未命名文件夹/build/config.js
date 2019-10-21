const path = require('path');
const glob = require('glob');

const subtree = [
    path.resolve(__dirname, '../lib/css/zdmui/zdm-ui.scss'),
    path.resolve(__dirname, '../lib/css/header.scss'),
    path.resolve(__dirname, '../lib/css/search/search-complete.scss'),
    path.resolve(__dirname, '../lib/css/search/search-history.scss'),
    path.resolve(__dirname, '../lib/js/z-framework.js'),
    path.resolve(__dirname, '../lib/js/search/search-complete-wiki.js')
];

// 获取入口文件
let entries = (entryPath => {
    let files = {};
    filesPath = glob.sync(`${entryPath}/**/*.js`, {
        ignore: [`${entryPath}/**/components/*.js`]
    });
    filesPath.forEach((entry, index) => {
        let chunkName = path.relative(entryPath, entry).replace(/\.js$/i, '');
        files[chunkName] = path.resolve(__dirname, '../', entry);
    });
    files.framework = subtree;
    return files;
})('src/pages');

// 获取自定义端口号
let port = (() => {
    const argv = JSON.parse(process.env.npm_config_argv).cooked;
    let argvIndex = param => {
        return argv.indexOf(param);
    };
    return argvIndex('--port') === -1 ? '' : argv[argvIndex('--port') + 1] || '';
})();

module.exports = {
    entries: entries,
    distRootPath: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/',
    absolutePath: 'http://res.smzdm.com/pc/pc_library_vue/dist/',
    server: {
        port: port || 8088
    }
};