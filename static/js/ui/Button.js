import React, {Component, PropTypes} from 'react'
import cx from 'classnames'

import {noop} from '../utils'


class Button extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    mod: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
  }

  static defaultProps = {
    className: 'mdl-button',
    onClick: noop,
    type: 'button',
  }

  constructor(props) {
    super(props)
  }

  handleClick = (event)=> {
    event.preventDefault()
    this.props.onClick(event)
  }

  render() {
    const {className, mod, children, ...otherProps} = this.props
    const cls = cx(className, mod && mod.split(' ').map((name)=> `${className}--${name}`))

    return (
      <button {...otherProps}
              className={cls}
              onClick={this.handleClick}>
        {children}
      </button>
    )
  }
}


export default Button
