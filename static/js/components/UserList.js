import React from 'react'
import Immutable from 'immutable'
import cx from 'classnames'
import User from '../ui/User'


class UserList extends React.Component {

  static propTypes = {
    users: React.PropTypes.instanceOf(Immutable.Iterable).isRequired,
    selected: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      sorting: 'likes'
    }
  }

  handleSortMostLikes = (event)=> {
    event.preventDefault()
    this.setState({sorting: 'likes'})
  };

  handleSortLeastLikes = (event)=> {
    event.preventDefault()
    this.setState({sorting: '-likes'})
  };

  render() {
    let {sorting} = this.state
    let users = this.props.users.sortBy((user)=>
      (sorting === 'likes') ? -user.likes : user.likes
    )

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
        <ul className="list-unstyled">
          {users.toArray().map(user =>
            <li key={user.id}>
              <User {...user}
                    selected={this.props.selected.includes(user)}
                    onClick={this.props.onSelect} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}


export default UserList
