import cx from 'classnames'
import React, {Component, PropTypes} from 'react'

import {mods} from '../utils'


class Menu extends Component {

  static propTypes = {
    mod: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className={mods('ui-menu', this.props.mod)}>
        {this.props.children}
      </nav>
    )
  }
}

export default Menu


export class MenuLink extends Component {

  static propTypes = {
    active: PropTypes.bool,
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
    const cls = cx('ui-menu__link', {'is-active': this.props.active})
    return <a className={cls} href="#" onClick={this.handleClick}>
      {this.props.children}
    </a>
  }
}

export const MenuSpacer = ()=>
  <div className="ui-menu__spacer" />
