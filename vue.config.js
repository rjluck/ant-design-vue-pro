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
    }
}