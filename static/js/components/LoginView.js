import React from 'react';


export default class LoginView extends React.Component {
  render() {
    return (
      <div className="login-view">
        <div className="login-panel">
          <a href="/login">
            Login with Instagram
          </a>
        </div>
      </div>
    );
  }
}
