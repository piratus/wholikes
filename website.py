from json import JSONDecodeError
from urllib.parse import urlencode

import requests
from flask import (
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for,
)


app = Flask(__name__)
app.config.from_object('local')

AUTH_URL = 'https://api.instagram.com/oauth/authorize'
AUTH_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'

AUTH_TOKEN_REQUEST = {
    'client_id': app.config['CLIENT_ID'],
    'client_secret': app.config['CLIENT_SECRET'],
    'grant_type': 'authorization_code',
}


@app.route('/')
def index():
    return render_template(
        'index.html',
        access_token=session.get('access_token'),
        error=session.pop('error', None),
    )


@app.route('/privacy/')
def privacy():
    return render_template('privacy.html')


@app.route('/login/')
def login():
    args = {
        'response_type': 'code',
        'scope': 'public_content+follower_list',
        'client_id': app.config['CLIENT_ID'],
        'redirect_uri': url_for('login_complete', _external=True),
    }
    return redirect('{0}?{1}'.format(AUTH_URL, urlencode(args, safe='+')))


@app.route('/login/complete/')
def login_complete():
    if 'error' in request.args:
        session['error'] = request.args['error']

    if 'code' in request.args:
        auth_response = requests.post(AUTH_TOKEN_URL, dict(
                AUTH_TOKEN_REQUEST,
                code=request.args['code'],
                redirect_uri=url_for('login_complete', _external=True)
        ))

        try:
            response = auth_response.json()
        except JSONDecodeError:
            session['error'] = 'Response is not JSON'
        else:
            if auth_response.status_code == 200:
                session['access_token'] = response['access_token']
            else:
                session['error'] = response.get('error_message',
                                                'Something went wrong')

    return redirect(url_for('index'))


@app.route('/logout/')
def logout():
    if 'access_token' in session:
        del session['access_token']

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='wholikes.local', debug=True)
