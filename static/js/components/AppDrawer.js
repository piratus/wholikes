import cx from 'classnames'
import React, {Component, PropTypes} from 'react'

import {prevent} from '../utils'


/**
 * @param {*} children
 * @param {boolean} open
 * @param {function} onClose
 * @constructor
 */
class AppDrawer extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleClick = (event)=> {
    if (event.isDefaultPrevented()) {
      this.props.onClose(event)
    }
  }

  render() {
    const {children, open} = this.props

    return (
      <aside className={cx('app-drawer', {'is-visible': open})}
             onClick={this.handleClick}>
        {children}
      </aside>
    )
  }
}


export default AppDrawer

/**
 * @param {*} children
 * @param {function} onClick
 * @param {...} otherProps
 * @constructor
 */
export const AppDrawerButton = ({children, onClick, ...otherProps})=>
  <button {...otherProps} className="app-drawer-button"
          onClick={prevent(onClick)}>
    {children}
  </button>


AppDrawerButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}
