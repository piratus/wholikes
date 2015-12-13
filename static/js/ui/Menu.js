import cx from 'classnames'
import React, {Component, PropTypes} from 'react'


class Menu extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="ui-menu">
        {this.props.children}
      </nav>
    )
  }
}

export default Menu


export class MenuLink extends Component {

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleClick = (event)=> {
    event.preventDefault()
    this.props.onClick(event)
  }

  render() {
    const {active, className} = this.props
    const cls = cx('ui-menu__link', className, {'is-active': active})

    return <a className={cls} href="#" onClick={this.handleClick}>
      {this.props.children}
    </a>
  }
}

export const MenuSpacer = ()=>
  <div className="ui-menu__spacer" />
