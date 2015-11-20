import React from 'react'


export default class LoginView extends React.Component {

  onClick(event) {
    event.preventDefault()
    window.location = '/login'
  }

  render() {
    return (
      <div className="login-view">
        <div className="login-panel">
          <a href="/login" onClick={this.onClick}>
            Login with Instagram
          </a>
        </div>
      </div>
    )
  }
}
