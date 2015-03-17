import React from 'react';

import {client} from 'data/Client';
import {flux} from 'flux';

import {Application} from 'Application.jsx!';
import {LoginView} from 'LoginView.jsx!';


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
      React.createElement(Application, {flux: flux}),
      document.body
    );
  }
}

init(window.APP_SETTINGS);
