module.exports = {
    //关闭打包后的map文件
    productionSourceMap: false,
    //关闭eslint
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://39.98.123.211",
                // pathRewrite: { "^/api": "" }   不需要路径重写，因为已经有/api了
            }
        }
    }
}