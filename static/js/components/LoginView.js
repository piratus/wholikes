import React, {Component, PropTypes} from 'react'

import Button from '../ui/Button'


class LoginView extends Component {

  static propTypes = {
    error: PropTypes.node,
    inProgress: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleClick = (event)=> {
    event.preventDefault()
    this.props.actions.login()
  }

  render() {
    const {error, inProgress} = this.props

    return (
      <div className="mdl-layout .login-card">

        {error && <div className="mdl-alert">{error}</div>}

        <section className="mdl-card mdl-card--login">
          <header className="mdl-card__title">
            <h1 className="mdl-card__title-text"> </h1>
          </header>
          <div className="mdl-card__text-block">
            <p className="text--lead">See who likes your Instagram photos the most</p>
          </div>
          <div className="mdl-card__text-block">
            <Button mod="primary raised wide"
                    onClick={this.handleClick}
                    disabled={inProgress}>
              Login
            </Button>
          </div>
          <footer className="mdl-card__supporting-text">
            <small>We do not store information about you or pass it to someone else</small>
          </footer>
        </section>

      </div>
    )
  }
}


export default LoginView
