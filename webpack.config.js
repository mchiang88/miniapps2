const path = require('path');

module.exports = [
  {
    name: 'challenge-1',
    mode: 'development',
    entry: './challenge_1/client/',
    output: {
      path: path.join(__dirname, './challenge_1/public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js[x]?/,
          include: [
            path.resolve(__dirname, './challenge_1/client')
          ],
          exclude: /(node_modules|challenge_2|challenge_3|challenge_4)/,
          options: {
            presets: ['react', 'env']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
]