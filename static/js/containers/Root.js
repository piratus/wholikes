import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as actions from '../actions'

import Application from '../components/Application'
import LoginView from '../components/LoginView'


function mapSateToProps({photos, user, ...state}) {
  return {
    ...state,
    self: user,
    inProgress: photos.inProgress,
    photos: photos.all,
  }
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


class Root extends Component {

  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    auth: PropTypes.shape({
      accessToken: PropTypes.string,
      error: PropTypes.string,
    }),
  }

  render() {
    const {auth, actions, ...otherProps} = this.props
    if (!auth.accessToken || auth.error) {
      return <LoginView {...auth} actions={actions} />
    }
    return <Application {...otherProps} actions={actions} />
  }
}


export default connect(mapSateToProps, mapDispatchToProps)(Root)
