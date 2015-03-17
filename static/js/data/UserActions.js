import Flux from 'minimal-flux';


export class UserActions extends Flux.Actions {

  init(user) {
    this.dispatch('init', user);
  }

}
