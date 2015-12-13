import React, {Component, PropTypes} from 'react'


class Spinner extends Component {

  static propTypes = {
    active: PropTypes.bool,
    size: PropTypes.number,
  }

  static defaultProps = {
    active: true,
  }

  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.active) {
      return null
    }

    return (
      <span className="ui-spinner">
        <span className="ui-spinner__item--1"/>
        <span className="ui-spinner__item--2"/>
        <span className="ui-spinner__item--3"/>
      </span>
    )
  }
}


export default Spinner
