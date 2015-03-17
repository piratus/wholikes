from flask import (
    Flask,
    redirect,
    render_template,
    request,
    url_for,
    session,
)
import requests

app = Flask(__name__)
app.config.from_object('local')

AUTH_URL = ('https://api.instagram.com/oauth/authorize/'
            '?client_id={0}&redirect_uri={1}&response_type=code')
AUTH_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'


@app.route('/')
def index():
    return render_template(
        'index.html',
        user=session.get('user'),
        access_token=session.get('access_token')
    )


@app.route('/login/')
def login():
    complete_url = url_for('login_complete', _external=True)
    return redirect(AUTH_URL.format(app.config['CLIENT_ID'], complete_url))


@app.route('/login/complete/')
def login_complete():
    auth_response = requests.post(AUTH_TOKEN_URL, {
        'client_id': app.config['CLIENT_ID'],
        'client_secret': app.config['CLIENT_SECRET'],
        'grant_type': 'authorization_code',
        'redirect_uri': url_for('login_complete', _external=True),
        'code': request.args['code'],
    })

    if auth_response.status_code == 200:
        response = auth_response.json()

        session['user'] = response['user']
        session['access_token'] = response['access_token']
        return redirect(url_for('index'))

    return render_template(
        'login_failed.html',
        auth_response=auth_response.text
    )


@app.route('/logout/')
def logout():
    if 'user' in session:
        del session['user']
    if 'access_token' in session:
        del session['access_token']

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='wholikes.local', debug=True)
