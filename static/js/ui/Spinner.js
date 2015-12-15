import React, {PropTypes} from 'react'

import {mods} from '../utils'


/**
 * Loading indicator
 *
 * @param {string=} mod
 * @param {string|number=} [size=18]
 * @constructor
 */
const Spinner = ({mod, size=18})=>
  <svg viewBox="25 25 50 50"
       className={mods('ui-spinner', mod)}
       style={{fontSize: size}}>
    <circle className="ui-spinner__circle"
            cx="50" cy="50" r="20" fill="none"
            strokeWidth="5" strokeMiterlimit="10" />
  </svg>


Spinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  mod: PropTypes.string,
}


export default Spinner
