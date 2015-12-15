import cx from 'classnames'
import React, {PropTypes} from 'react'

import {prevent} from '../utils'


/**
 * @param {*} children
 * @param {boolean} open
 * @constructor
 */
export const AppDrawer = ({children, open})=>
  <aside className={cx('app-drawer', {'is-visible': open})}>
    {children}
  </aside>

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}


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
