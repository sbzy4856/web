const base = {
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    host: 'localhost',
    open: false,
    // https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:10086',
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack(config) {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index')
    // 移除 preload 插件
    config.plugins.delete('preload-index')

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {})
  }
}
const config = {
  ...base,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      sdkPath: process.env.sdkpath,
      webpath: process.env.webpath
    }
  },
  publicPath: './',
  assetsDir: 'static',
  outputDir: 'dist/web'
}
module.exports = config
