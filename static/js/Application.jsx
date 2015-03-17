import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';

import {TopBar} from 'components/TopBar.jsx!';
import {PhotoList} from 'components/PhotoList.jsx!';
import {UserList} from 'components/UserList.jsx!';


export class Application extends React.Component {

  constructor() {
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
    var {selectedUsers} = this.state;
    this.setState({
      selectedUsers: multi ? selectedUsers.concat([user]) : [user],
      selectedPhotos: []
    });
  }

  handlePhotoSelect(user, multi) {
    var {selectedPhotos} = this.state;
    this.setState({
      selectedUsers: [],
      selectedPhotos: multi ?  selectedPhotos.concat([user]) : [user]
    });
  }

  getLikedPhotos(users) {
    var {photos, likes} = this.props.flux.stores.photos.getState();
    var photoIds = likes.filter(
        values => _(users).map(
            user => values.contains(user.id)
        ).any()
    );
    return [for (id of photoIds.keys()) photos.get(id)];
  }

  getSelectedUsers(photos) {
    var {likes} = this.props.flux.stores.photos.getState();
    var {users} = this.props.flux.stores.users.getState();
    var selected = Immutable.Set();
    photos.forEach(photo => {
      selected = selected.merge(likes.get(photo.id));
    });
    return selected.map(id => users.get(id)).toArray();
  }

  render() {
    var {photos, likes} = this.props.flux.stores.photos.getState();
    var {users, self} = this.props.flux.stores.users.getState();
    var {selectedUsers, selectedPhotos} = this.state;

    if (selectedUsers.length) {
      selectedPhotos = this.getLikedPhotos(selectedUsers);
    }
    else if (selectedPhotos.length) {
      selectedUsers = this.getSelectedUsers(selectedPhotos)
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

Application.propTypes = {
  flux: React.PropTypes.object.isRequired
};
