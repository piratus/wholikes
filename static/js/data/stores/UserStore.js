import {Store} from 'minimal-flux';
import {Record, Map} from 'immutable';

import {load} from '../LocalStorage';
import {client} from '../Client';


const BaseCurrentUser = new Record({
  id: null,
  username: '',
  profilePicture: '',
  fullName: '',
  likes: 0,
  comments: 0,

  mediaLoaded: 0,
  mediaTotal: 0,

  totalFollows: 0,
  totalFollowedBy: 0
});


class CurrentUser extends BaseCurrentUser {

}


const BaseUser = new Record({
  id: null,
  username: '',
  profilePicture: '',
  fullName: '',
  likes: 0,
  comments: 0,
  follows: false,
  followed: false
});


class User extends BaseUser {

}


export default class UserStore extends Store {

  constructor(props) {
    super(props);
    let users = Object.entries(load('users', {}))
      .map(([key, value])=> [key, new CurrentUser(value)]);

    this.state = {
      self: new CurrentUser(),
      users: new Map(users)
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

  handleReceiveProfile({data: profile}) {
    let {counts: {media, follows, followedBy}} = profile;
    let {self} = this.getState();

    self = self.withMutations((self)=> {
      return self.set('mediaTotal', media)
                 .set('totalFollows', follows)
                 .set('totalFollowedBy', followedBy);
    });

    this.setState({self});
  }

  handleReceiveFollows({data}) {
    let followedUsers = data.map((user)=>
        [user.id, new User({...user, followed: true})]
    );
    this.setState({
      users: this.state.users.merge(followedUsers)
    });
  }

  handleReceivePhotos(photos) {
    let {self} = this.state;
    this.setState({
      self: self.set('mediaLoaded', self.mediaLoaded + photos.length)
    });
  }

  handleReceiveLikes({data}) {
    let {users, self} = this.state;
    let {likes} = this.stores.photos.getState();

    users = users.merge(data.map((user)=> [user.id, new User(user)]));
    users = users.map((user)=> user.set('likes', likes.filter((value)=> value.contains(user.id)).size));

    this.setState({users, self: self.set('likes', likes.count)});
  }

  save() {
    localStorage.users = JSON.stringify(this.state.users.toJS());
  }

}
