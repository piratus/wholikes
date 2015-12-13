import {combineReducers} from 'redux'

import {
  LOGIN, LOGOUT,
  FETCH_PROFILE_SUCCESS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_PHOTOS,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAIL,
} from './actions'


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
    return {
      ...state,
      inProgress: true,
    }
  case LOGOUT:
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


const photosState = {
  all: [],
  maxId: false,
  inProgress: false,
}

function photos(state = photosState, action) {
  switch (action.type) {
  case FETCH_PHOTOS:
    return {
      ...state,
      inProgress: true,
    }
  case FETCH_PHOTOS_SUCCESS:
    return {
      all: [...state.all, ...action.response.data],
      inProgress: false,
      maxId: action.response.pagination.nextMaxId,
    }
  case FETCH_PHOTOS_FAIL:
    return {
      ...state,
      inProgress: false,
    }
  default:
    return state
  }
}

export default combineReducers({user, auth, photos})
