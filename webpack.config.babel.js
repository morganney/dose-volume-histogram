import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const ui = path.join(__dirname, 'packages', 'ui')
const src = path.join(ui, 'src')

export default () => {
  return {
    entry: {
      app: ['core-js/stable', 'regenerator-runtime/runtime', path.join(src, 'index.js')]
    },
    output: {
      path: path.join(ui, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [src],
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'eslint-loader',
              options: {
                emitWarning: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'DVH',
        filename: 'index.html',
        template: path.join(src, 'index.html'),
        inject: true
      })
    ]
  }
}
