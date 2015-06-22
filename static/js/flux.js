import {Flux} from 'minimal-flux';

import PhotoActions from 'data/actions/PhotoActions';
import PhotoStore from 'data/stores/PhotoStore';
import UserActions from 'data/actions/UserActions';
import UserStore from 'data/stores/UserStore';


const flux = new Flux({
  actions: {
    photos: PhotoActions,
    users: UserActions
  },
  stores: {
    photos: PhotoStore,
    users: [UserStore, 'photos']
  }
});


export default flux;
