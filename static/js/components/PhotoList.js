import React from 'react';
import Immutable from 'immutable';
import cx from 'classnames';

import Icon from 'ui/Icon';
import PropTypes from '../utils/PropTypes';


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
    super(props);
  }

  handleClick = (event)=> {
    event.preventDefault();
    this.props.onClick(this.props.photo, event.metaKey);
  };

  render() {
    const {photo, size, selected} = this.props;
    const className = cx('photo', {
      'with-data': photo.loaded,
      selected,
    });

    return (
      <li className={className} onClick={this.handleClick}>
        <img src={photo.thumbnail} width={size} height={size} />
        <span className="likes">{photo.likes}</span>
      </li>
    );
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
    super(props);
    this.state = {
      sorting: 'date',
      reversed: false,
    };
  }

  handleLoadMore = (event)=> {
    event.preventDefault();
    this.context.actions.photos.fetch();
  };

  handleSortByDate = (event)=> {
    event.preventDefault();
    this.setState({sorting: 'date', reversed: false});
  };

  handleSortMostLikes = (event)=> {
    event.preventDefault();
    this.setState({sorting: 'likes', reversed: true});
  };

  handleSortLeastLikes = (event)=> {
    event.preventDefault();
    this.setState({sorting: 'likes', reversed: false});
  };

  render() {
    let items = this.props.items.toIndexedSeq();
    let {sorting, reversed} = this.state;
    if (sorting === 'likes') {
      items = items.sortBy((photo)=> photo.likes);
    }
    if (reversed) {
      items = items.reverse();
    }
    return (<div className="photo-list">
      <dl className="sub-nav">
        <dt>Order:</dt>
        <dd className={cx({active: sorting === 'date'})}>
          <a href="#" onClick={this.handleSortByDate}>By date</a>
        </dd>
        <dd className={cx({active: sorting === 'likes' && reversed})}>
          <a href="#" onClick={this.handleSortMostLikes}>Most likes</a>
        </dd>
        <dd className={cx({active: sorting === 'likes' && !reversed})}>
          <a href="#" onClick={this.handleSortLeastLikes}>Least likes</a>
        </dd>
      </dl>
      <ul>
        {Array.from(items).map(item =>
          <Photo key={item.id}
                 photo={item}
                 size={75}
                 selected={this.props.selected.includes(item)}
                 onClick={this.props.onSelect} />
        )}
        <li>
          <button onClick={this.handleLoadMore}>
            <Icon name="refresh" />
          </button>
        </li>
      </ul>
    </div>);
  }
}


export default PhotoList;
