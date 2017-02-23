import {Store} from 'minimal-flux-2'
import {Record, Map, OrderedMap, Set} from 'immutable'

import {load} from '../LocalStorage'


const BasePhoto = new Record({
  id: null,
  thumbnail: '',
  created: null,
  likes: 0,
  comments: 0,
  loaded: false
})


class Photo extends BasePhoto {

  constructor(attrs) {
    super({
      id: attrs.id,
      created: new Date(attrs.createdTime * 1000),
      thumbnail: attrs.images.thumbnail.url,
      likes: attrs.likes.count,
      comments: attrs.comments.count
    })
  }

}


export default class PhotoStore extends Store {

  constructor(props) {
    super(props)

    let photos = load('photos')
      .map((item) => [item.id, new Photo(item)])

    let likes = Object.entries(load('likes', {}))
      .map(([key, value]) => [key, new Set(value)])

    this.state = {
      photos: new OrderedMap(photos),
      likes: new Map(likes)
    }

    this.handleAction('photos.receive', this.handleReceive)
    this.handleAction('photos.fetchLikes', this.handleFetchLikes)
    this.handleAction('photos.receiveLikes', this.handleReceiveLikes)
  }

  handleFetch() {}

  handleReceive(data) {
    let newItems = data.map((item)=> [item.id, new Photo(item)])
    this.setState({photos: this.state.photos.merge(newItems)})
  }

  handleFetchLikes() {}

  handleReceiveLikes({id, data}) {
    let {photos, likes} = this.state
    this.setState({
      photos: photos.setIn([id, 'loaded'], true),
      likes: likes.set(id, new Set(data.map((item)=> item.id)))
    })
  }

  save() {
    let {photos, likes} = this.state
    localStorage.photos = JSON.stringify(photos.toArray())
    localStorage.likes = JSON.stringify(likes.toJS())
  }

}
