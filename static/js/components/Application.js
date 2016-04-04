import React, {Component, PropTypes} from 'react'

import IconLeft from 'react-icons/md/chevron-left'
import IconMenu from 'react-icons/md/menu'
import IconPhotos from 'react-icons/md/photo-library'
import IconPeople from 'react-icons/md/people'
import IconQuit from 'react-icons/md/power-settings-new'

import AppDrawer, {AppDrawerButton} from './AppDrawer'
import AppHeader from './AppHeader'
import Menu, {MenuLink} from '../ui/Menu'
import PhotoGrid from './PhotoGrid'
import {noop} from '../utils'


const Overlay = ({open, onClick})=>
  <div className={`application__obfuscator ${open ? 'is-visible' : ''}`}
       onClick={onClick} />


const UserProfile = ({username, profilePicture, fullName, counts})=>
  <header className="app-drawer__title">
    <section className="user-info">
      <img className="user-info__picture" src={profilePicture} />
      <div className="user-info__label">
        <span className="user-info__name">{fullName}</span>
        <small className="user-info__username">{`@${username}`}</small>
      </div>
    </section>

    {counts &&
      <section className="user-stats">
        <div className="user-stats__item">
          <span className="user-stats__value">{counts.media}</span>
          <span className="user-stats__label">Posts</span>
        </div>

        <div className="user-stats__item">
          <span className="user-stats__value">{counts.follows}</span>
          <span className="user-stats__label">Following</span>
        </div>

        <div className="user-stats__item">
          <span className="user-stats__value">{counts.followedBy}</span>
          <span className="user-stats__label">Followers</span>
        </div>
      </section>
    }
  </header>


class Application extends Component {

  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    self: PropTypes.object.isRequired,
    photos: PropTypes.array,
    inProgress: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  state = {
    drawerOpen: false,
    selected: new Set(),
  }

  handleDrawer = (event)=> {
    event.stopPropagation()
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handlePhotoSelect = (id)=> {
    this.setState({selected: new Set([id])})
  }

  render() {
    const {self, actions, photos, inProgress} = this.props
    const {drawerOpen, selected} = this.state

    return (
      <div className="application">
        <AppHeader title="Photos">
          <AppDrawerButton onClick={this.handleDrawer}>
            <IconMenu size="2em" className="icon" />
          </AppDrawerButton>
        </AppHeader>

        <AppDrawer open={drawerOpen} onClose={this.handleDrawer} >
          <AppDrawerButton onClick={this.handleDrawer}>
            <IconLeft size="2em" className="icon" />
          </AppDrawerButton>

          <UserProfile {...self} />

          <Menu mod="drawer">
            <MenuLink active onClick={noop}>
              <IconPhotos className="icon" size="2em" />Photos
            </MenuLink>
            <MenuLink onClick={noop}>
              <IconPeople className="icon" size="2em" />People
            </MenuLink>
          </Menu>

          <div className="app-drawer__spacer" />

          <Menu mod="drawer drawer-bottom">
            <MenuLink onClick={actions.logout}>
              <IconQuit className="icon" size="2em" />Exit
            </MenuLink>
          </Menu>
        </AppDrawer>

        <main className="application__content">
          <PhotoGrid photos={photos}
                     selected={selected}
                     inProgress={inProgress}
                     onFetchMore={actions.fetchPhotos}
                     onSelect={this.handlePhotoSelect} />

        </main>

        <Overlay open={drawerOpen} onClick={this.handleDrawer} />
      </div>
    )
  }
}

export default Application
