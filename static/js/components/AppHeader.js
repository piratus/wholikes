import React, {Component, PropTypes} from 'react'

import Button from '../ui/Button'
import MenuIcon from 'react-icons/lib/md/menu'
import MoreIcon from 'react-icons/lib/md/more-vert'


class AppHeader extends Component {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    onDrawer: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleLogout = (event)=> {
    event.preventDefault()
    this.props.onLogout()
  }

  handleDrawer = (event)=> {
    event.preventDefault()
    this.props.onDrawer(event)
  }

  render() {
    const {user} = this.props
    return (
      <header className="application__header">
        <Button mod="application-drawer"
                onClick={this.handleDrawer}>
          <MenuIcon />
        </Button>
        <div className="application__header-row">
          <div className="application__title">{user.username}</div>

          <div className="application__header-spacer" />

          <Button mod="icon">
            <MoreIcon />
          </Button>
        </div>
      </header>

    )
  }
}


export default AppHeader
