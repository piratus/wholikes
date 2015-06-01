const API_ROOT = 'https://api.instagram.com/v1';
const RECENT_MEDIA_URL = '/users/self/media/recent/';


export class Client {
  init({accessToken}) {
    this.accessToken = accessToken;
  }

  fetch(url, params) {
    let scriptElement = document.createElement('script');
    let random = Number(Math.round(Math.random() * 1000));
    let request = Object.assign({
      'access_token': this.accessToken,
      'callback': `callback_${Number(new Date())}_${random}`
    }, params || {});

    scriptElement.src = API_ROOT + url + '?' +
      Object.entries(request)
        .map((pair)=> pair.join('='))
        .join('&');

    return new Promise((resolve) => {
      window[request.callback] = (data) => {
        delete window[request.callback];
        resolve(data);
      };

      document.body.appendChild(scriptElement);
    });
  }

  getPhotos(maxId) {
    let request = {count: 30};
    if (maxId) { request.max_id = maxId; }// eslint-disable-line camelcase
    return this.fetch(RECENT_MEDIA_URL, request);
  }

  getLikes(id) {
    return this.fetch(`/media/${id}/likes`);
  }
}

export const client = new Client();
