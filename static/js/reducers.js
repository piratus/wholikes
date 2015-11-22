import {combineReducers} from 'redux'

import {
  LOGIN, LOGOUT,
  FETCH_PROFILE_SUCCESS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_PHOTOS_SUCCESS,
} from './actions'
import {deleteCookie} from './utils'


function user(state = {username: '', followedBy: []}, action) {
  switch (action.type) {
  case FETCH_PROFILE_SUCCESS:
    return {
      ...state,
      ...action.response.data,
    }
  case FETCH_FOLLOWERS_SUCCESS:
    return {
      ...state,
      followedBy: [...action.response.data, ...state.followedBy],
    }
  default:
    return state
  }
}

function auth(state = {}, action) {
  switch (action.type) {
  case LOGIN:
    window.location = window.APP_SETTINGS.REDIRECT_URL
    return {
      ...state,
      inProgress: true,
    }
  case LOGOUT:
    deleteCookie('session')
    return {
      ...state,
      error: null,
      inProgress: false,
      accessToken: null,
    }
  default:
    return state
  }
}

function photos(state = [], action) {
  switch (action.type) {
  case FETCH_PHOTOS_SUCCESS:
    return [...state, ...action.response.data]
  default:
    return state
  }
}

export default combineReducers({user, auth, photos})
