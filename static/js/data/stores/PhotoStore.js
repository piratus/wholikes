import _ from 'lodash';
import Flux from 'minimal-flux';
import Immutable from 'immutable';
import {load} from 'data/LocalStorage';

var Photo = new Immutable.Record({
  id: null,
  thumbnail: '',
  created: null,
  likes: 0,
  comments: 0,
  loaded: false
});


export class PhotoStore extends Flux.Store {

  constructor(props) {
    super(props);
    var photos = load('photos').map(item => [item.id, new Photo(item)]);
    var likes = load('likes', {});

    this.state = {
      photos: new Immutable.OrderedMap(photos),
      likes: new Immutable.Map(_.map(likes, (value, key) => [key, new Immutable.Set(value)]))
    };

    this.handleAction('photos.fetch', this.handleFetch);
    this.handleAction('photos.fetchLikes', this.handleFetchLikes);
  }

  handleFetch(data) {
    var {photos} = this.getState();

    var newItems = data.map((item) => [item.id, new Photo({
      id: item.id,
      created: new Date(item.created_time * 1000),
      thumbnail: item.images.thumbnail.url,
      likes: item.likes.count,
      comments: item.comments.count
    })]);

    this.setState({photos: photos.merge(newItems)});
  }

  handleFetchLikes({id, data}) {
    var {photos, likes} = this.getState();
    this.setState({
      photos: photos.setIn([id, 'loaded'], true),
      likes: likes.set(id, new Immutable.Set(data.map(item => item.id)))
    });
  }

  save() {
    var {photos, likes} = this.getState();
    localStorage.photos = JSON.stringify(photos.toArray());
    localStorage.likes = JSON.stringify(likes.toJS());
  }

}
