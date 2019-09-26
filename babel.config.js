module.exports = api => {
  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = ['@babel/plugin-proposal-object-rest-spread']

  api.cache(() => process.env.NODE_ENV)

  return {
    presets,
    plugins
  }
}
