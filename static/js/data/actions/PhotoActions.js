import Flux from 'minimal-flux';


export default class PhotoActions extends Flux.Actions {

  fetch() {
    this.dispatch('fetch');
  }

  receive(data) {
    this.dispatch('receive', data);
  }

  fetchLikes(id) {
    this.dispatch('fetchLikes', id);
  }

  receiveLikes(data) {
    this.dispatch('receiveLikes', data);
  }

}
