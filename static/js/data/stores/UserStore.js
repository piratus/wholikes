import _ from 'lodash';
import Flux from 'minimal-flux';
import Immutable from 'immutable';
import {load} from 'data/LocalStorage';


const User = new Immutable.Record({
  'username': '',
  'profile_picture': '',
  'id': null,
  'full_name': '',
  'likes': 0
});


export default class UserStore extends Flux.Store {

  constructor(props) {
    super(props);
    let users = _.map(load('users', {}), (value, key) => [key, new User(value)]);
    this.state = {
      self: new User(),
      users: new Immutable.Map(users)
    };

    this.handleAction('users.init', this.handleInit);
    this.handleAction('photos.receiveLikes', this.handleReceiveLikes);
  }

  handleInit(data) {
    this.setState({self: new User(data)});
  }

  handleReceiveLikes({data}) {
    let {users} = this.getState();
    let {likes} = this.stores.photos.getState();

    users = users.merge(data.map(user => [user.id, new User(user)]));
    users = users.map(user => user.set('likes', likes.filter(value => value.contains(user.id)).size));

    this.setState({users});
  }

  save() {
    let {users} = this.getState();
    localStorage.users = JSON.stringify(users.toJS());
  }

}
