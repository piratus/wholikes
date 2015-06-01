import _ from 'lodash';
import Flux from 'minimal-flux';
import Immutable from 'immutable';

import {client} from '../Client';
import {load} from '../LocalStorage';


const Photo = new Immutable.Record({
  id: null,
  thumbnail: '',
  created: null,
  likes: 0,
  comments: 0,
  loaded: false
});


export default class PhotoStore extends Flux.Store {

  constructor(props) {
    super(props);
    var photos = load('photos').map(item => [item.id, new Photo(item)]);
    var likes = load('likes', {});

    this.state = {
      photos: new Immutable.OrderedMap(photos),
      likes: new Immutable.Map(_.map(likes, (value, key) => [key, new Immutable.Set(value)]))
    };

    this.handleAction('photos.fetch', this.handleFetch);
    this.handleAction('photos.receive', this.handleReceive);
    this.handleAction('photos.fetchLikes', this.handleFetchLikes);
    this.handleAction('photos.receiveLikes', this.handleReceiveLikes);
  }

  handleFetch() {
    client.getPhotos(this.maxId).then(({data, pagination}) => {
      this.maxId = pagination.next_max_id;
      PhotoStore.actions.photos.receive(data);
      data.forEach(({id})=> { PhotoStore.actions.photos.fetchLikes(id); });
    });
  }

  handleReceive(data) {
    let {photos} = this.getState();

    let newItems = data.map((item) => [item.id, new Photo({
      id: item.id,
      created: new Date(item.created_time * 1000),
      thumbnail: item.images.thumbnail.url,
      likes: item.likes.count,
      comments: item.comments.count
    })]);

    this.setState({photos: photos.merge(newItems)});
  }

  handleFetchLikes(id) {
    client.getLikes(id).then((response)=> {
      PhotoStore.actions.photos.receiveLikes({id, data: response.data});
    });
  }

  handleReceiveLikes({id, data}) {
    let {photos, likes} = this.getState();
    this.setState({
      photos: photos.setIn([id, 'loaded'], true),
      likes: likes.set(id, new Immutable.Set(data.map(item => item.id)))
    });
  }

  save() {
    let {photos, likes} = this.getState();
    localStorage.photos = JSON.stringify(photos.toArray());
    localStorage.likes = JSON.stringify(likes.toJS());
  }

}
