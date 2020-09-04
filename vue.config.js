const monacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  runtimeCompiler: true,
  filenameHashing: false,
  productionSourceMap:false,
  configureWebpack: {
    plugins: [
      new monacoWebpackPlugin()
    ]
  }
}