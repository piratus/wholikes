import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'


import Application from '../components/Application'
import LoginView from '../components/LoginView'


function mapSateToProps(state) {
  return state
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


class Root extends React.Component {

  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func),
    user: React.PropTypes.object,
    auth: React.PropTypes.object,
    photos: React.PropTypes.any,
  }

  render() {
    const {auth, user, photos, actions} = this.props
    if (!auth.accessToken || auth.error) {
      return <LoginView {...auth} actions={actions} />
    }
    return <Application self={user} photos={photos} actions={actions} />
  }
}


export default connect(mapSateToProps, mapDispatchToProps)(Root)
