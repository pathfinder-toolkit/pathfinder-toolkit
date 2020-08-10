## EnergyPathfinder Frontend

[Hosted on heroku](https://pathfinder-toolkit.herokuapp.com/)

### Setup

Copy and rename env.example. Insert the following required environmental values:

- REACT_APP_AUTH_DOMAIN, REACT_APP_AUTH_CLIENT, REACT_APP_AUTH_AUDIENCE - Your Auth0 Domain, Client and Audience.
- REACT_APP_API_ROOT: Root domain of your server API (implement separately: code found in https://github.com/pathfinder-toolkit/pathfinder-server)
- REACT_APP_CLOUDINARY_CLOUD_NAME: Your cloudinary account cloud name.
- REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY: Google Recaptcha site key enabled for Recaptcha v2.

Note that you will also have to reimplement checkAdminStatus function in https://github.com/pathfinder-toolkit/pathfinder-toolkit/blob/master/src/utils/react-auth0-spa.js or make a custom rule in Auth0 to make sure you get the correct namespaced Admin role, or Admin verification will not work.

### Usage

npm install

npm start
