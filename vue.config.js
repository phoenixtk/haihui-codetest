module.exports = {
    css:                   {
        // 当为true时，css文件名可省略 module 默认为 false
        // modules:       false,
        requireModuleExtension: true,
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 默认生产环境下是 true，开发环境下是 false
        extract:       false,
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap:     false,
        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {
            css:  {},
            less: {},
            sass: {
                /*treeData: `@import "@/assets/css/main.scss";`*/
            }
        },
    },
    devServer:             {
        port:    7788,
        open:    true,
        overlay: {
            warnings: false,
            errors:   false,
        },
        proxy:   {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target:       process.env.VUE_APP_BASE_API_TARGET,
                changeOrigin: true,
                pathRewrite:  {
                    ['^' + process.env.VUE_APP_BASE_API]: '',
                },
            },
        },
    },
    lintOnSave: false,
}
