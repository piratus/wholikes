import React from 'react';
import {Flux} from 'minimal-flux';


export default {
  flux: React.PropTypes.instanceOf(Flux),
  actions: React.PropTypes.object
};
