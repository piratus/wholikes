import Flux from 'minimal-flux';

import {PhotoActions} from 'data/PhotoActions';
import {PhotoStore} from 'data/PhotoStore';
import {UserActions} from 'data/UserActions';
import {UserStore} from 'data/UserStore';


export const flux = new Flux.Flux({
  actions: {
    photos: PhotoActions,
    users: UserActions
  },
  stores: {
    photos: PhotoStore,
    users: [UserStore, 'photos']
  }
});
