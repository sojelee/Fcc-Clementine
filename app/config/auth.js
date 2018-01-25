'use strict';

var githubAuth={};
githubAuth.clientID=process.env.GITHUB_KEY;
githubAuth.clientSecret=proecess.env.GITHUB_SECRET;
githubAuth.callbackURL=process.env.APP_URL + 'auth/github/callback'

module.exports = githubAuth;

