const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    //...
    publicPath: './',
    //...
    chainWebpack: (config) => {
        config.resolve.alias
        .set('@', resolve('src'));
    },
    // devServer: {
    //     proxy: {
    //         '/api' : {
    //             target: 'http://192.168.1.133:8891/',
    //             ws: true,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // }
}