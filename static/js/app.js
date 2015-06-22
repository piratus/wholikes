import 'babel-polyfill';
import '../styles/app.sass';

import React from 'react';

import {client} from 'data/Client';
import flux from 'flux';

import Application from 'components/Application';
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
