import Flux from 'minimal-flux';


export default class UserActions extends Flux.Actions {

  init(user) {
    this.dispatch('init', user);
  }

}
