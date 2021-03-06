import React from 'react'


export default class TopBar extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  handleLogout(event) {
    event.preventDefault()
    window.location = '/logout'
  }

  render() {
    let {user} = this.props
    let {mediaLoaded: loaded, mediaTotal: total} = user
    let mediaLabel = (loaded === total) ? loaded : `${loaded}/${total}`

    return (
      <div className="top-bar">
        <ul className="title-area">
          <li className="name">
            <img src={user.profilePicture} width={24} height={24}/>
            {user.username}
          </li>
        </ul>
        <section className="top-bar-section">
          <ul className="left">
            <li className="active">
              <a href="#">Media <span className="label">{mediaLabel}</span></a>
            </li>
          </ul>
          <ul className="right">
            <li><a href="/logout" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </section>
      </div>
    )
  }

}
