module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2018',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: '16.9.0'
    }
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        'ignores': ['modules']
      }
    ],
    'node/no-unpublished-import': [
      'error',
      {
        allowModules: [
          'html-webpack-plugin'
        ]
      }
    ]
  }
}
