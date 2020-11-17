require('dotenv').config();
// axios는 HTTP 요청을 하기 위한 라이브러리입니다.
const axios = require('axios');
const mainUri = 'https://d2z76t8ifhgwqt.cloudfront.net';
const redirectUri = 'http://3.35.21.164:3000';
// GitHub에 OAuth 앱을 등록한 후, 발급받은 client id 및 secret을 입력합니다.
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
let accessToken;
let userData;
module.exports = {
  intro: (req, res) => {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}/users/signin/callback`
    );
  },
  get: (req, res) => {
    const requestToken = req.query.code;
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      accessToken = response.data.access_token;
      res.redirect(`${redirectUri}/users/signin/callback/userinfo`);
    });
  },
  userinfo: (req, res) => {
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + accessToken,
      },
    }).then((response) => {
      userData = response.data;
      res.redirect(`${mainUri}/?githublogin`);
    });
  },

  returnUser: (req, res) => {
    res.send(userData);
  },
};
