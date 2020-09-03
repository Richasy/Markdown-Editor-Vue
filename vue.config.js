const monacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports={
    runtimeCompiler: true,
    filenameHashing:false,
    configureWebpack: {
        plugins: [
          new monacoWebpackPlugin()
        ]
      }
}