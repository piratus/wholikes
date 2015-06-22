import React from 'react';
import Immutable from 'immutable';
import cx from 'classnames';


class User extends React.Component {

  static propTypes = {
    user: React.PropTypes.instanceOf(Immutable.Record).isRequired,
    selected: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  constructor(props) {
    super(props);
  }

  handleClick = (event)=> {
    event.preventDefault();
    this.props.onClick(this.props.user, event.metaKey);
  };

  render() {
    let {user, selected} = this.props;

    return (
      <li className={cx('user', {selected})} onClick={this.handleClick}>
        <img src={user.profilePicture} />
        <span className="name">{user.username}</span>
        <span className="likes">{user.likes}</span>
      </li>
    );
  }

}


class UserList extends React.Component {

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

  handleSortMostLikes = (event)=> {
    event.preventDefault();
    this.setState({sorting: 'likes'});
  };

  handleSortLeastLikes = (event)=> {
    event.preventDefault();
    this.setState({sorting: '-likes'});
  };

  render() {
    let {sorting} = this.state;
    let users = this.props.users.sortBy((user)=>
      (sorting === 'likes') ? -user.likes : user.likes
    );

    return (
      <div className="user-list">
        <dl className="sub-nav">
          <dt>Order:</dt>
          <dd className={cx({active: sorting === 'likes'})}>
            <a href="#" onClick={this.handleSortMostLikes}>
              Most likes
            </a>
          </dd>
          <dd className={cx({active: sorting === '-likes'})}>
            <a href="#" onClick={this.handleSortLeastLikes}>
              Least likes
            </a>
          </dd>
        </dl>
        <ul>
          {users.toArray().map(user =>
            <User key={user.id}
                  user={user}
                  selected={this.props.selected.includes(user)}
                  onClick={this.props.onSelect} />
          )}
        </ul>
      </div>
    );
  }
}


export default UserList;
