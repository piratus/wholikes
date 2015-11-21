import Flux from 'minimal-flux'
import {client} from '../Client'


export default class UserActions extends Flux.Actions {

  fetchProfile() {
    this.dispatch('fetchProfile')
    client.getProfile().then((profile)=> {
      this.receiveProfile(profile)
    })
  }

  receiveProfile(profile) {
    this.dispatch('receiveProfile', profile)
  }

  fetchFollowedBy() {
    this.dispatch('fetchFollowedBy')
    client.getFollowedBy().then((followedBy)=> {
      this.receiveProfile(followedBy)
    })
  }
  receiveFollowedBy(followedBy) {
    this.dispatch('receiveFollowedBy', followedBy)
  }

  fetchFollows() {
    this.dispatch('fetchFollows')
    client.getFollows().then((follows)=> {
      this.receiveProfile(follows)
    })
  }

  receiveFollows(follows) {
    this.dispatch('receiveFollows', follows)
  }
}
