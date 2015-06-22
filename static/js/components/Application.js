import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';

import TopBar from './TopBar';
import PhotoList from './PhotoList';
import UserList from './UserList';

import PropTypes from '../utils/PropTypes';

class Application extends React.Component {

  static propTypes = {
    flux: PropTypes.flux
  };

  static childContextTypes = {
    actions: PropTypes.actions
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      selectedPhotos: []
    };

    this.handleChange = this.forceUpdate.bind(this, null);
  }

  getChildContext() {
    return {actions: this.props.flux.actions};
  }

  componentWillMount() {
    Object.values(this.props.flux.stores).forEach(store => {
      store.on('change', this.handleChange);
    });
  }

  componentWillUnmount() {
    Object.values(this.props.flux.stores).forEach(store => {
      store.off('change', this.handleChange);
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

  handleUserSelect = (user, multi)=> {
    let {selectedUsers} = this.state;
    this.setState({
      selectedUsers: multi ? selectedUsers.concat([user]) : [user],
      selectedPhotos: []
    });
  };

  handlePhotoSelect = (user, multi)=> {
    let {selectedPhotos} = this.state;
    this.setState({
      selectedUsers: [],
      selectedPhotos: multi ? selectedPhotos.concat([user]) : [user]
    });
  };

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

    return (
      <div>
        <div className="fixed">
          <TopBar user={self} />
        </div>
        <div className="main-container">
          <PhotoList items={photos}
                     selected={selectedPhotos}
                     onSelect={this.handlePhotoSelect} />
          <UserList users={users}
                    selected={selectedUsers}
                    onSelect={this.handleUserSelect} />
        </div>
      </div>
    );
  }
}

export default Application;
