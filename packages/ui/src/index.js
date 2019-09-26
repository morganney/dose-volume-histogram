import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./app', renderApp)
}
