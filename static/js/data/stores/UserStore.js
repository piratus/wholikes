import _ from 'lodash';
import Flux from 'minimal-flux';
import Immutable from 'immutable';

import {load} from '../LocalStorage';
import {client} from '../Client';


const BaseCurrentUser = new Immutable.Record({
  id: null,
  username: '',
  picture: '',
  name: '',
  likes: 0,
  comments: 0,

  mediaLoaded: 0,
  mediaTotal: 0,

  totalFollows: 0,
  totalFollowedBy: 0
});


class CurrentUser extends BaseCurrentUser {
  constructor(attrs={}) {
    let {profile_picture: picture, full_name: name} = attrs;
    super({...attrs, picture, name});
  }
}


const BaseUser = new Immutable.Record({
  id: null,
  username: '',
  picture: '',
  name: '',
  likes: 0,
  comments: 0,
  follows: false,
  followed: false
});


class User extends BaseUser {
  constructor(attrs={}) {
    let {profile_picture: picture, full_name: name} = attrs;
    super({...attrs, picture, name});
  }
}


export default class UserStore extends Flux.Store {

  constructor(props) {
    super(props);
    let users = _.map(load('users', {}), (value, key) => [key, new CurrentUser(value)]);
    this.state = {
      self: new CurrentUser(),
      users: new Immutable.Map(users)
    };

    this.handleAction('users.init', this.handleInit);
    this.handleAction('users.receiveProfile', this.handleReceiveProfile);
    this.handleAction('users.receiveFollows', this.handleReceiveFollows);
    this.handleAction('photos.receive', this.handleReceivePhotos);
    this.handleAction('photos.receiveLikes', this.handleReceiveLikes);
  }

  handleInit(data) {
    let {self} = this.getState();
    this.setState({self: new CurrentUser({...self, ...data})});

    client.getProfile().then((profile)=> {
      UserStore.actions.users.receiveProfile(profile);
    });

    client.getFollows().then((follows)=> {
      UserStore.actions.users.receiveFollows(follows);
    });

    client.getFollowedBy().then((followedBy)=> {
      UserStore.actions.users.receiveFollowedBy(followedBy);
    });
  }

  handleReceiveProfile(profile) {
    let {counts: {media, follows, followed_by: followedBy}} = profile;
    let {self} = this.getState();

    self = self.withMutations((self)=> {
      return self.set('mediaTotal', media)
                 .set('totalFollows', follows)
                 .set('totalFollowedBy', followedBy);
    });

    this.setState({self});
  }

  handleReceiveFollows(follows) {
    let {self} = this.getState();

    this.setState({
      self: self.set('totalFollows', follows.length)
    });
  }

  handleReceivePhotos(photos) {
    let {self} = this.getState();
    this.setState({
      self: self.set('mediaLoaded', self.mediaLoaded + photos.length)
    });
  }

  handleReceiveLikes({data}) {
    let {users, self} = this.getState();
    let {likes} = this.stores.photos.getState();

    users = users.merge(data.map(user => [user.id, new User(user)]));
    users = users.map(user => user.set('likes', likes.filter(value => value.contains(user.id)).size));

    this.setState({users, self: self.set('likes', likes.count)});
  }

  save() {
    let {users} = this.getState();
    localStorage.users = JSON.stringify(users.toJS());
  }

}
