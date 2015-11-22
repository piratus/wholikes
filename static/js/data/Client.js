import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'
import zipObject from 'lodash.zipobject'


const API_ROOT = 'https://api.instagram.com/v1'


function uniqueId() {
  return Number(new Date())
}

function makeScriptElement(url, params) {
  let query = Object.entries(params)
    .map(([key, value])=> value ? `${snakeCase(key)}=${value}` : '').join('&')
  let scriptElement = document.createElement('script')
  scriptElement.src = API_ROOT + url + '?' + query
  return scriptElement
}


function parseResponse(obj) {
  function getValue(value) {
    if (Array.isArray(value)) { return value.map(parseResponse) }
    if (value && typeof value == 'object') { return parseResponse(value) }
    return value
  }
  let values = Object.entries(obj).map(([key, value])=>
      [camelCase(key), getValue(value)]
  )
  return zipObject(values)
}


export default class Client {

  constructor(accessToken) {
    this.accessToken = accessToken
  }

  fetch(url, params = {}) {
    const request = {
      ...params,
      accessToken: this.accessToken,
      callback: `callback_${uniqueId()}`,
    }
    const scriptEl = makeScriptElement(url, request)

    return new Promise((resolve, reject)=> {
      window[request.callback] = (response)=> {
        response = parseResponse(response)

        if (response.meta.code === 200) { resolve(response) }
        else { reject(response.meta) }

        delete window[request.callback]
        document.body.removeChild(scriptEl)
      }

      document.body.appendChild(scriptEl)
    })
  }

}
