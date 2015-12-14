import cx from 'classnames'

export function mods(block, mod, ...extra) {
  if (mod) {
    mod = mod.split(' ').map(m => `${block}--${m}`).join(' ')
  }
  return cx(block, mod, ...extra)
}

export function noop() {
  // Do nothing
}

export function prevent(func) {
  return function (event) {
    event.preventDefault()
    func(event)
  }
}

export function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

