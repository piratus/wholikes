import React from 'react'
import Immutable from 'immutable'
import cx from 'classnames'

import Icon from 'ui/Icon'
import PropTypes from '../utils/PropTypes'


class Photo extends React.Component {

  static propTypes = {
    photo: React.PropTypes.shape({
      thumbnail: React.PropTypes.string.isRequired,
      likes: React.PropTypes.number.isRequired,
      loaded: React.PropTypes.bool.isRequired,
    }).isRequired,
    selected: React.PropTypes.bool,
    size: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  constructor(props) {
    super(props)
  }

  handleClick = (event)=> {
    event.preventDefault()
    this.props.onClick(this.props.photo, event.metaKey)
  };

  render() {
    const {photo, selected} = this.props
    const className = cx('photo', {
      'with-data': photo.loaded,
      selected,
    })

    return (
      <div className={className} onClick={this.handleClick}>
        <img src={photo.thumbnail} />
        <span className="photo-likes icon icon-heart">{photo.likes}</span>
      </div>
    )
  }
}


class PhotoList extends React.Component {

  static propTypes = {
    items: React.PropTypes.instanceOf(Immutable.Iterable).isRequired,
    selected: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    actions: PropTypes.actions
  };

  constructor(props) {
    super(props)
    this.state = {
      sorting: 'date',
      reversed: false,
    }
  }

  handleLoadMore = (event)=> {
    event.preventDefault()
    this.context.actions.photos.fetch()
  };

  handleSortByDate = (event)=> {
    event.preventDefault()
    this.setState({sorting: 'date', reversed: false})
  };

  handleSortByLikes = (event)=> {
    event.preventDefault()
    const {sorting, reversed} = this.state
    this.setState({
      sorting: 'likes',
      reversed: (sorting !== 'likes' ? false : !reversed)
    })
  };

  render() {
    let items = this.props.items.toIndexedSeq()
    let {sorting, reversed} = this.state
    if (sorting === 'likes') {
      items = items.sortBy((photo)=> photo.likes)
    }
    if (reversed) {
      items = items.reverse()
    }
    return (
      <section className="photo-list">
        <div className="btn-group">
          <button className={cx('btn btn-secondary btn-sm', {active: sorting === 'date'})} type="button" onClick={this.handleSortByDate}>
            Date {(sorting === 'date') && <i className="icon icon-down" />}
          </button>
          <button className={cx('btn btn-secondary btn-sm', {active: sorting === 'likes'})} type="button" onClick={this.handleSortByLikes}>
            Likes {(sorting === 'likes') && <i className={cx('icon', {'icon-up': reversed, 'icon-down': !reversed})} />}
          </button>
        </div>

        <button className="btn btn-sm btn-icon btn-secondary icon-dot-3 pull-right" onClick={this.handleLoadMore} />

        <ul className="list-unstyled list-inline">
          {Array.from(items).map(item =>
            <li key={item.id}>
              <Photo photo={item}
                     size={75}
                     selected={this.props.selected.includes(item)}
                     onClick={this.props.onSelect} />
            </li>
          )}
        </ul>
      </section>
    )
  }
}


export default PhotoList
