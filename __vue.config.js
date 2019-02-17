const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === "production"

module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // sass: {
        // so this assumes you have a file named `src/variables.scss`
        // data: `@import "~/bulma";` //data: `@import "@/bulma.scss";`
      // },
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: isProd ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            },
          }
        })
      ] : []
    }
  }
}