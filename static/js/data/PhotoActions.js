import Flux from 'minimal-flux';
import {client} from 'data/Client';


const RECENT_MEDIA_URL = '/users/self/media/recent/';


export class PhotoActions extends Flux.Actions {

  fetch() {
    var request = {count: 30};

    if (this.maxId) {
      request['max_id'] = this.maxId;
    }

    client.fetch(RECENT_MEDIA_URL, request).then(({data, pagination}) => {
      this.maxId = pagination['next_max_id'];
      this.dispatch('fetch', data);
      data.forEach(this.fetchLikes.bind(this));
    });
  }

  fetchLikes({id}) {
    client.fetch(`/media/${id}/likes`).then((data) => {
      this.dispatch('fetchLikes', {id, data:data.data});
    })
  }

}
