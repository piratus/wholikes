import React from 'react';
import {flux} from 'flux';


export class TopBar extends React.Component {

  render() {
    const actions = flux.actions;

    return <div className="top-bar">
      <ul className="title-area">
        <li className="name">
          <img src={this.props.user.profile_picture} width={24} height={24} />
          {' '}
          {this.props.user.username}
        </li>
      </ul>
      <section className="top-bar-section">
        <ul className="right">
          <li><a href="/logout">Logout</a></li>
        </ul>
      </section>
    </div>
  }

}

TopBar.propTypes = {
  user: React.PropTypes.object.isRequired
};
