import cx from 'classnames'
import React, {Component, PropTypes} from 'react'
import IconHeart from 'react-icons/md/favorite'

import Button from '../ui/Button'
import Spinner from '../ui/Spinner'


class Photo extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (event)=> {
    event.preventDefault()
    this.props.onClick(this.props.photo.id)
  }

  render() {
    const {photo, selected} = this.props
    const cls = cx('ui-photo-grid__item', {
      'is-selected': selected,
    })

    return <div className={cls}>
        <img src={photo.images.thumbnail.url}
             onClick={this.handleClick}
             className="ui-photo-grid__image" />
        <div className="ui-photo-grid__item-info">
          <IconHeart className="icon" size="16px" /><span className="likes">{photo.likes.count}</span>
        </div>
      </div>
  }
}


class PhotoGrid extends Component {

  static propTypes = {
    photos: PropTypes.array,
    selected: PropTypes.instanceOf(Set),
    inProgress: PropTypes.bool.isRequired,
    onFetchMore: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleFetchMore = (event)=> {
    event.preventDefault()
    this.props.onFetchMore()
  }


  render() {
    const {photos, selected, inProgress} = this.props

    return (
      <section className="ui-photo-grid">
        {photos && photos.map(photo =>
          <Photo key={photo.id}
                 photo={photo}
                 selected={selected && selected.has(photo.id)}
                 onClick={this.props.onSelect} />
        )}
        <footer className="ui-photo-grid__footer">
          {inProgress
            ? <Spinner size="36px" mod="flat" />
            : <Button onClick={this.handleFetchMore} mod="raised accent">
                Load more
              </Button>
          }
        </footer>
      </section>
    )
  }
}


export default PhotoGrid
