import cx from 'classnames'
import React, {Component, PropTypes} from 'react'


class AppDrawer extends Component {

  static propTypes = {
    title: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const cls = cx('application-drawer', {
      'is-visible': this.props.open,
    })
    return (
      <div className={cls}>
        <span className="application-drawer__title">{this.props.title}</span>
        {this.props.children}
      </div>
    )
  }
}


export default AppDrawer
