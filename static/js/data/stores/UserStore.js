import _ from 'lodash';
import Flux from 'minimal-flux';
import Immutable from 'immutable';
import {load} from 'data/LocalStorage';


export const User = new Immutable.Record({
  'username': '',
  'profile_picture': '',
  'id': null,
  'full_name': '',
  'likes': 0
});


export class UserStore extends Flux.Store {

  constructor(props) {
    super(props);
    var users = _.map(load('users', {}), (value, key) => [key, new User(value)]);
    this.state = {
      self: new User(),
      users: new Immutable.Map(users)
    };

    this.handleAction('users.init', this.handleInit);
    this.handleAction('photos.fetchLikes', this.handleFetchLikes);
  }

  handleInit(data) {
    this.setState({self: new User(data)});
  }

  handleFetchLikes({data}) {
    var {users} = this.getState();
    var {likes} = this.stores.photos.getState();

    users = users.merge(data.map(user => [user.id, new User(user)]));
    users = users.map(user => user.set('likes', likes.filter(value => value.contains(user.id)).size));

    this.setState({users});
  }

  save() {
    var {users} = this.getState();
    localStorage.users = JSON.stringify(users.toJS());
  }

}
