import React from 'react'

import AppHeader from './AppHeader'
import Button from '../ui/Button'
import IconMore from 'react-icons/lib/md/chevron-right'


class Application extends React.Component {

  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    self: React.PropTypes.object.isRequired,
    photos: React.PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
    }
  }

  handleDrawer = (event)=> {
    event.preventDefault()
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const {self, actions, photos} = this.props
    const {drawerOpen} = this.state

    return (
      <div className="application">
        <AppHeader user={self}
                   onDrawer={this.handleDrawer}
                   onLogout={actions.logout} />

        <main className="application__content">
          {self.counts && <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">

              <section className="mdl-card mdl-shadow--2dp">
                <header className="mdl-card__title">
                  <h3 className="mdl-card__title-text">People</h3>
                </header>
                <div className="mdl-card__text-block">
                  <p className="text--lead">
                    <strong>Followed by</strong> {self.counts.followedBy} <small>{self.followedBy.length} fetched</small>
                  </p>
                  <p className="text--lead">
                    <strong>Follows</strong> {self.counts.follows} <small>0 fetched</small>
                  </p>
                </div>
                <div className="mdl-card__actions mdl-card__actions--right">
                  <Button onClick={this.handleDrawer} mod="raised primary">Details <IconMore /></Button>
                </div>
              </section>

            </div>
            <div className="mdl-cell mdl-cell--6-col">

              <section className="mdl-card mdl-shadow--2dp">
                <header className="mdl-card__title">
                  <h3 className="mdl-card__title-text">Media</h3>
                </header>
                <div className="mdl-card__text-block">
                  <p className="text--lead">Media: {photos.length}/{self.counts.media}</p>
                </div>
                <div className="mdl-card__actions mdl-card__actions--right">
                  <Button mod="raised primary">Details <IconMore /></Button>
                </div>
              </section>

            </div>
          </div>}
        </main>
        <div className={`application__obfuscator ${drawerOpen && 'is-visible'}`}
             onClick={this.handleDrawer} />
      </div>
    )
  }
}

export default Application
