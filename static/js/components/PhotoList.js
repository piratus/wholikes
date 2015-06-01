import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import classnames from 'classnames';

import PropTypes from '../utils/PropTypes';


export default class Photo extends React.Component {

  static propTypes = {
    url: React.PropTypes.string.isRequired,
    loaded: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    size: React.PropTypes.number.isRequired,
    likes: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  };


  static defaultProps = {
    loaded: true,
    selected: false
  };

  render() {
    var props = this.props;
    var className = classnames('photo', {
      'with-data': this.props.loaded,
      selected: this.props.selected
    });

    return <li className={className} onClick={this.props.onClick}>
      <img src={props.url} width={props.size} height={props.size} />
      <span className="likes">{this.props.likes}</span>
    </li>;
  }
}


export default class PhotoList extends React.Component {

  static propTypes = {
    items: React.PropTypes.instanceOf(Immutable.Iterable).isRequired,
    selected: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    actions: PropTypes.actions
  };

  handleLoadMore(event) {
    event.preventDefault();
    this.context.actions.photos.fetch();
  }

  render() {
    var items = this.props.items.toArray();
    return <div className="photo-list">
      <dl className="sub-nav">
        <dt>Order:</dt>
        <dd className="active"><a href="#">By date</a></dd>
        <dd><a href="#">Most likes</a></dd>
        <dd><a href="#">Least likes</a></dd>
      </dl>
      <ul>
        {items.map(item =>
          <Photo key={item.id}
                 url={item.thumbnail}
                 size={64}
                 loaded={item.loaded}
                 selected={_.contains(this.props.selected, item)}
                 onClick={event => this.props.onSelect(item, event.metaKey)}
                 likes={item.likes} />
        )}
      </ul>
    </div>;
  }
}
