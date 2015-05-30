import * as polyfill from 'babel/polyfill';  // eslint-disable-line no-unused-vars
import stylesheet from 'styles/app.sass';  // eslint-disable-line no-unused-vars

import React from 'react';

import {client} from 'data/Client';
import flux from 'flux';

import Application from 'components/Application';  // eslint-disable-line no-unused-vars
import LoginView from 'components/LoginView';


function init({accessToken, user}) {
  if (!accessToken) {
    React.render(
      React.createElement(LoginView),
      document.body
    );
  }
  else {
    client.init({accessToken: accessToken});
    flux.actions.users.init(user);
    flux.actions.photos.fetch();

    React.render(
      <Application flux={flux} />,
      document.body
    );
  }
}

init(window.APP_SETTINGS);
