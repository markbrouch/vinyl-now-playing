import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from './reducers'
import { isProduction } from './utils/env-util'

const configureStore = (initialState = {}) => {
  const middleware = [ thunk ]
  if (!isProduction) {
    middleware.push(createLogger())
  }

  const composeEnhancers =
    !isProduction &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
