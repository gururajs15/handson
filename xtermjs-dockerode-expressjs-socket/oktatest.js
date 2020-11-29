const express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const app = express();
const oidc = new ExpressOIDC({
  issuer: 'https://dev-5367366.okta.com/oauth2/default',
  client_id: '0oah2rjy6c86lHCj65d5',
  client_secret: 'HCACe75CL-6AQ7DWE4wEEU2nDdLIfWp2wS2ErTl2',
  appBaseUrl: 'http://135.17.180.132:3000',
  scope: 'openid profile'
});

app.use(session({
  secret: 'lkjasdl3202309Jlkjhlksd0809823eklmlkmasxlkjlkqj',
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

app.get('/', (req, res) => {
  if (req.userContext) {
    res.send(`
      Hello ${req.userContext.userinfo.name}!
      <form method="POST" action="/logout">
        <button type="submit">Logout</button>
      </form>
    `);
  } else {
    res.send('Please <a href="/login">login</a>');
  }
});

app.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
  res.send('Top Secret');
});

app.get('/forces-logout', oidc.forceLogoutAndRevoke(), (req, res) => {
 // Nothing here will execute, after the redirects the user will end up wherever the `routes.logoutCallback.path` specifies (default `/`)
});


oidc.on('ready', () => {
  app.listen(3000, () => console.log('app started'));
});

oidc.on('error', err => {
  // An error occurred while setting up OIDC, during token revokation, or during post-logout handling
});
