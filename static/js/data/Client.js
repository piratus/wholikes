import _ from 'lodash';

const API_ROOT = 'https://api.instagram.com/v1';

export class Client {
  init({accessToken}) {
    this.accessToken = accessToken;
  }

  fetch(url, params) {
    let scriptElement = document.createElement('script');
    let random = Number(Math.round(Math.random() * 1000));
    let request = _.extend({
      'access_token': this.accessToken,
      'callback': `callback_${Number(new Date())}_${random}`
    }, params || {});

    scriptElement.src = API_ROOT + url + '?' +
      _.pairs(request)
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
}

export const client = new Client();
