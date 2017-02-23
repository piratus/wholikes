import Flux from 'minimal-flux-2'
import {client} from '../Client'


export default class PhotoActions extends Flux.Actions {

  fetch() {
    this.dispatch('fetch')
    client.getPhotos(this.maxId).then(({data, pagination})=> {
      this.maxId = pagination.nextMaxId
      this.receive(data)

      for (let photo of data) {
        this.fetchLikes(photo.id)
      }
    })
  }

  receive(data) {
    this.dispatch('receive', data)
  }

  fetchLikes(id) {
    client.getLikes(id).then(({data})=> {
      this.receiveLikes({id, data})
    })
  }

  receiveLikes(data) {
    this.dispatch('receiveLikes', data)
  }

}
