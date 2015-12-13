import cx from 'classnames'
import React, {Component, PropTypes} from 'react'

import IconHeart from 'react-icons/md/favorite'
import IconPhotos from 'react-icons/md/photo-library'
import IconPeople from 'react-icons/md/people'
import IconQuit from 'react-icons/md/power-settings-new'

import AppDrawer from './AppDrawer'
import AppHeader from './AppHeader'
import Menu, {MenuLink, MenuSpacer} from '../ui/Menu'
import PhotoGrid from './PhotoGrid'
import {noop} from '../utils'


const Overlay = ({open, onClick})=>
  <div className={`application__obfuscator ${open ? 'is-visible' : ''}`}
       onClick={onClick} />


const Title = ()=>
  <span>
    <IconHeart size="2em" className="icon" /> Who Likes
  </span>


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
    event.preventDefault()
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
        <AppHeader title={self.username} onMenuClick={this.handleDrawer} />

        <AppDrawer title={<Title />} open={drawerOpen}>
          <Menu>
            <MenuLink active onClick={noop}>
              <IconPhotos className="icon" size="2em" /> Photos
            </MenuLink>
            <MenuLink onClick={noop}>
              <IconPeople className="icon" size="2em" /> People
            </MenuLink>

            <MenuSpacer />

            <MenuLink onClick={actions.logout}>
              <IconQuit className="icon" size="2em" /> Exit
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
