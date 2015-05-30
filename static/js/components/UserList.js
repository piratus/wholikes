import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import classnames from 'classnames';


export class User extends React.Component {

  static propTypes = {
    user: React.PropTypes.instanceOf(Immutable.Record).isRequired,
    selected: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  render() {
    var user = this.props.user;
    var className = classnames('user', {selected: this.props.selected});

    return <li className={className} onClick={this.props.onClick}>
      <img src={user.profile_picture} />
      <span className="name">{user.username}</span>
      <span className="likes">{user.likes}</span>
    </li>;
  }

}


export class UserList extends React.Component {

  static propTypes = {
    users: React.PropTypes.instanceOf(Immutable.Iterable).isRequired,
    selected: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      sorting: 'likes'
    };
  }

  handleSort(sorting, event) {
    event.preventDefault();
    this.setState({sorting});
  }

  render() {
    var {sorting} = this.state;
    var users = this.props.users.sortBy(user =>
      (sorting === 'likes') ? -user.likes : user.likes
    );

    return <div className="user-list">
      <dl className="sub-nav">
        <dt>Order:</dt>
        <dd className={classnames({active: sorting === 'likes'})}>
          <a href="#" onClick={this.handleSort.bind(this, 'likes')}>
            Most likes
          </a>
        </dd>
        <dd className={classnames({active: sorting === '-likes'})}>
          <a href="#" onClick={this.handleSort.bind(this, '-likes')}>
            Least likes
          </a>
        </dd>
      </dl>
      <ul>
        {users.map(user =>
          <User key={user.id}
                user={user}
                selected={_.contains(this.props.selected, user)}
                onClick={event => this.props.onSelect(user, event.metaKey)} />
        ).toArray()}
      </ul>
    </div>;
  }
}
