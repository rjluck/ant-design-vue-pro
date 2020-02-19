/* eslint-disable prettier/prettier */
// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            less: {
                // 这里的选项会传递给 less-loader
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        // 添加要替换的 loader
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                //bypass做mock数据拦截
                bypass: function (req, res) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    } else if (process.env.MOCK !== "none") {
                        const name = req.path && req.path.split('/api/')[1] && req.path.split('/api/')[1].split('/').join('_');//mock下面的文件名称
                        const mock = require(`./mock/${name}`);//引入mock文件
                        const result = mock(req.method);
                        delete require.cache[require.resolve(`./mock/${name}`)];//清理缓存，为了下次能拿到最新的数据
                        return res.send(result);
                    }
                }
            }
        }
    }
}