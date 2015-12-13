import React, {Component, PropTypes} from 'react'
import MenuIcon from 'react-icons/md/menu'

import Button from '../ui/Button'



class AppHeader extends Component {

  static propTypes = {
    title: PropTypes.node,
    spacer: PropTypes.bool,
    children: PropTypes.element,
    onMenuClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    spacer: true,
  }

  constructor(props) {
    super(props)
  }

  handleMenuClick = (event)=> {
    event.preventDefault()
    this.props.onMenuClick(event)
  }

  render() {
    const {title, spacer, children} = this.props
    return (
      <header className="application__header">
        <Button className="application__drawer-button"
                onClick={this.handleMenuClick}>
          <MenuIcon className="application__drawer-button-icon" />
        </Button>
        <div className="application__header-row">
          {title && <div className="application__title">{title}</div>}
          {spacer && <div className="application__header-spacer" />}
          {children}
        </div>
      </header>

    )
  }
}


export default AppHeader
