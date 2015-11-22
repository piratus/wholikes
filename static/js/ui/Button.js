import React, {Component, PropTypes} from 'react'

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
    const {className = '', mod = '', children, ...otherProps} = this.props
    const modCls = mod.split(' ').map((name)=> `mdl-button--${name}`).join(' ')

    return (
      <button {...otherProps}
              className={`mdl-button ${className} ${modCls}`}
              onClick={this.handleClick}>
        {children}
      </button>
    )
  }
}


export default Button
