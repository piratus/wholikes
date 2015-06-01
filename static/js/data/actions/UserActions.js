import Flux from 'minimal-flux';


export default class UserActions extends Flux.Actions {

  init(user) {
    this.dispatch('init', user);
  }

  receiveProfile(profile) {
    this.dispatch('receiveProfile', profile);
  }

  receiveFollowedBy(followedBy) {
    this.dispatch('receiveFollowedBy', followedBy);
  }

  receiveFollows(follows) {
    this.dispatch('receiveFollows', follows);
  }
}
