import 'babel-polyfill'
import '../styles/style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './configureStore'
import {fetchProfile, fetchFollowers, fetchPhotos} from './actions'
import Root from './containers/Root'


const {accessToken, error} = window.APP_SETTINGS

const store = configureStore({
  auth: {accessToken, error},
})

if (accessToken) {
  store.dispatch(fetchProfile())
    .then(()=> Promise.all([
      store.dispatch(fetchFollowers()),
      store.dispatch(fetchPhotos()),
    ]))
}


ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
