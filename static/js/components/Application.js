import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';

import TopBar from './TopBar';  // eslint-disable-line no-unused-vars
import PhotoList from './PhotoList';  // eslint-disable-line no-unused-vars
import UserList from './UserList';  // eslint-disable-line no-unused-vars


export default class Application extends React.Component {

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.forceUpdate.bind(this, null);
    this.state = {
      selectedUsers: [],
      selectedPhotos: []
    };
  }

  componentWillMount() {
    _.each(this.props.flux.stores, store => {
      store.on('change', this.handleChange);
    });
  }

  componentWillUnmount() {
    _.each(this.props.flux.stores, store => {
      store.off('change', this.handleChange);
    });
  }

  handleUserSelect(user, multi) {
    let {selectedUsers} = this.state;
    this.setState({
      selectedUsers: multi ? selectedUsers.concat([user]) : [user],
      selectedPhotos: []
    });
  }

  handlePhotoSelect(user, multi) {
    let {selectedPhotos} = this.state;
    this.setState({
      selectedUsers: [],
      selectedPhotos: multi ? selectedPhotos.concat([user]) : [user]
    });
  }

  getLikedPhotos(users) {
    let {photos, likes} = this.props.flux.stores.photos.getState();
    let photoIds = likes.filter(
        values => _(users).map(
            user => values.contains(user.id)
        ).any()
    );
    return Array.from(photoIds.keys()).map((id)=> photos.get(id));
  }

  getSelectedUsers(photos) {
    let {likes} = this.props.flux.stores.photos.getState();
    let {users} = this.props.flux.stores.users.getState();
    let selected = new Immutable.Set();
    photos.forEach(photo => {
      selected = selected.merge(likes.get(photo.id));
    });
    return selected.map(id => users.get(id)).toArray();
  }

  render() {
    let {photos} = this.props.flux.stores.photos.getState();
    let {users, self} = this.props.flux.stores.users.getState();
    let {selectedUsers, selectedPhotos} = this.state;

    if (selectedUsers.length) {
      selectedPhotos = this.getLikedPhotos(selectedUsers);
    }
    else if (selectedPhotos.length) {
      selectedUsers = this.getSelectedUsers(selectedPhotos);
    }

    return <div>
      <div className="fixed">
        <TopBar user={self} />
      </div>
      <div className="main-container">
        <PhotoList items={photos}
                   selected={selectedPhotos}
                   onSelect={this.handlePhotoSelect.bind(this)} />
        <UserList users={users}
                  selected={selectedUsers}
                  onSelect={this.handleUserSelect.bind(this)} />
      </div>
    </div>;
  }
}
