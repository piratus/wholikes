export function load(key, _default = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || _default
  }
  catch (e) {
    return _default
  }
}
