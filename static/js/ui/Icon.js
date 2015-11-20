import React from 'react'


export default class Icon extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  };

  render() {
    let {name} = this.props
    return <span className={`icon-${name}`} />
  }
}
