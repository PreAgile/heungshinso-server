require('dotenv').config();
// axios는 HTTP 요청을 하기 위한 라이브러리입니다.
const users = require('../../models').user;
const axios = require('axios');
const mainUri = 'https://heungshinso.ml';
const redirectUri = 'https://heungshinso.tk';
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
    console.log('requestToken :' + requestToken);
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
    }).then(async (response) => {
      userData = response.data;
      const oauth = 'github';
      const oauth_id = userData.id;
      const username = userData.name;
      try {
        await users.findOne({ where: { oauth, oauth_id } }).then((data) => {
          if (data) {
            userData = data;
          } else {
            users
              .create({
                username,
                oauth,
                oauth_id,
              })
              .then((data) => {
                userData = data;
              });
          }
        });
      } catch (error) {
        console.error(error);
      }
      res.redirect(`${mainUri}/?githublogin`);
    });
  },

  returnUser: (req, res) => {
    res.send(userData);
  },
};
