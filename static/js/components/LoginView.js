import React from 'react'


export default class LoginView extends React.Component {

  onClick(event) {
    event.preventDefault()
    window.location = window.APP_SETTINGS.REDIRECT_URL
  }

  render() {
    return (
      <div className="login-view">
        <div className="login-panel">
          <a href={window.APP_SETTINGS.REDIRECT_URL} onClick={this.onClick}>
            Login with Instagram
          </a>
        </div>
      </div>
    )
  }
}
