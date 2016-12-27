import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'

const main = () => {
  const app = document.getElementById('App')

  render((
    <AppContainer>
      <App />
    </AppContainer>
  ), app)
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      const NewApp = require('./components/App').default
      render((
        <AppContainer>
          <NewApp />
        </AppContainer>
      ), app)
    })
  }
}

main()
