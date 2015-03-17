# Who Likes My Photos

## Development installation

First create a create a `local.py` configuration file

    SECRET_KEY = '<your secret key>'
    CLIENT_ID = '<your client id>'
    CLIENT_SECRET = '<your client secret>'
    
`CLIENT_ID` and `SECRET_KEY` are issued at 
[Instagram Developers](https://instagram.com/developer/clients/register/) page.
Current setup assumes application is registered with Instagram at 
`http://wholikes.local:5000'`. You can register your own application with 
another URL and modify `website.py` to serve the app at the URL you like. 
Be sure to update your `/etc/hosts`.

Then run development server
    
    make devserver
