const path = require('path')


const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap:false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@c', resolve('src/components'))
            .set('@v', resolve('src/views'))
    },

    devServer: {
        proxy: {
            '/directory': {
                target: 'http://1.15.98.145:9999',
                changeOrigin: true,
                headers: {
                    Cookie: 'access_token=99f60dbb65d431f9ca483c579d6bf4d3'
                },
                ws: false
            }
        },
        open: true
    },

    // 定义全局less变量
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/common/style/variables.less'),
            ]
        }
    }
}