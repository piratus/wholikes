/*eslint-env node*/
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from './reducers'
import api from './middleware/api'


const finalCreateStore = compose(
  applyMiddleware(thunk, api, createLogger({collapsed: true})),
  window.devToolsExtension ? window.devToolsExtension() : (f)=> f
)(createStore)


export default function configureStore(initialState) {
  const store = finalCreateStore(reducers, initialState)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers')
        store.replaceReducer(nextReducer)
      })
    }
  }

  return store
}
