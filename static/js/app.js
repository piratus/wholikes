import 'babel-polyfill'
import '../styles/app.sass'

import React from 'react'

import {client} from 'data/Client'
import flux from './flux'

import Application from 'components/Application'
import LoginView from 'components/LoginView'


const {accessToken, error} = window.APP_SETTINGS

if (!accessToken) {
  React.render(
    <LoginView error={error} />,
    document.body
  )
}
else {
  client.init({accessToken})
  flux.actions.users.fetchProfile()
  flux.actions.photos.fetch()

  React.render(
    <Application flux={flux} error={error} />,
    document.body
  )
}
