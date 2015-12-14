import React, {Component, PropTypes} from 'react'

import Button from '../ui/Button'
import Spinner from '../ui/Spinner'


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
      <main className="app-login-form">

        {error && <div className="mdl-alert">{error}</div>}

        <section className="mdl-card mdl-card--login">
          <div className="mdl-card__text-block">
            <p className="text--lead">See who likes your Instagram photos the most</p>
          </div>
          <div className="mdl-card__text-block">
            {inProgress
              ? <Spinner />
              : <Button mod="login" onClick={this.handleClick}>Login</Button>
            }
          </div>
          <footer className="mdl-card__text-block mdl-card__supporting-text">
            <p className="text-small">
              We do not store information about you or pass it to someone else
            </p>
          </footer>
        </section>

      </main>
    )
  }
}


export default LoginView
