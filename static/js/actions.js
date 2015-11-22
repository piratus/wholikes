import {API_CALL} from './middleware/api'


export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export function login() {
  return {
    type: LOGIN,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}


export const FETCH_PROFILE = 'FETCH_PROFILE'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL'

export function fetchProfile(userId = 'self') {
  return {
    userId,
    [API_CALL]: {
      url: `/users/${userId}`,
      types: [FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL],
    },
  }
}

export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS'
export const FETCH_FOLLOWERS_SUCCESS = 'FETCH_FOLLOWERS_SUCCESS'
export const FETCH_FOLLOWERS_FAIL = 'FETCH_FOLLOWERS_FAIL'


export function fetchFollowers(userId = 'self') {
  return {
    userId,
    [API_CALL]: {
      url: `/users/${userId}/followed-by`,
      all: true,
      types: [FETCH_FOLLOWERS, FETCH_FOLLOWERS_SUCCESS, FETCH_FOLLOWERS_FAIL],
    },
  }
}

export const FETCH_PHOTOS = 'FETCH_PHOTOS'
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS'
export const FETCH_PHOTOS_FAIL = 'FETCH_PHOTOS_FAIL'

export function fetchPhotos(userId = 'self') {
  return {
    [API_CALL]: {
      url: `/users/${userId}/media/recent/`,
      types: [FETCH_PHOTOS, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_FAIL],
    },
  }
}
