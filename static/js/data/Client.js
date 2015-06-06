import {camelCase, snakeCase, object} from 'lodash';


const API_ROOT = 'https://api.instagram.com/v1';
const RECENT_MEDIA_URL = '/users/self/media/recent/';


function makeScriptElement(url, params) {
  let query = Object.entries(params)
    .map(([key, value])=> value ? `${snakeCase(key)}=${value}` : '').join('&');
  let scriptElement = document.createElement('script');
  scriptElement.src = API_ROOT + url + '?' + query;
  return scriptElement;
}


function parseResponse(obj) {
  function getValue(value) {
    if (Array.isArray(value)) { return value.map(parseResponse); }
    if (value && typeof value == 'object') { return parseResponse(value); }
    return value;
  }
  let values = Object.entries(obj).map(([key, value])=>
      [camelCase(key), getValue(value)]
  );
  return object(values);
}



export class Client {

  init({accessToken}) {
    this.accessToken = accessToken;
  }

  fetch(url, params={}) {
    let random = Number(Math.round(Math.random() * 1000));
    let request = {
      ...params,
      accessToken: this.accessToken,
      callback: `callback_${Number(new Date())}_${random}`
    };

    return new Promise((resolve, reject)=> {
      window[request.callback] = (response)=> {
        let {meta, data, pagination} = parseResponse(response);
        if (meta.code === 200) { resolve({data, pagination}); }
        else { reject(meta); }
        delete window[request.callback];
      };

      document.body.appendChild(makeScriptElement(url, request));
    });
  }

  getPhotos(maxId) {
    return this.fetch(RECENT_MEDIA_URL, {count: 30, maxId});
  }

  getLikes(id) {
    return this.fetch(`/media/${id}/likes`);
  }

  getProfile(id='self') {
    return this.fetch(`/users/${id}`);
  }

  getFollowedBy(id='self') {
    return this.fetch(`/users/${id}/followed-by`);
  }

  getFollows(id='self') {
    return this.fetch(`/users/${id}/follows`);
  }
}

export const client = new Client();
