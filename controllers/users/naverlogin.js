require('dotenv').config();
const users = require('../../models').user;
const request = require('request');
const client_id = process.env.NAVER_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.NAVER_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
let state = '12345'; // random 문자열
const mainURI = 'https://heungshinso.ml';
const reURI = 'https://heungshinso.tk';
const redirectURI = encodeURI(`${reURI}/users/signin/naverlogin/callback`);
let api_url = '';
var token;
let userData;
let user;
module.exports = {
  get: (req, res) => {
    api_url =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
      client_id +
      '&redirect_uri=' +
      redirectURI +
      '&state=' +
      state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(
      "<a href='" +
        api_url +
        "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
    );
  },
  callback: (req, res) => {
    code = req.query.code;
    state = req.query.state;
    api_url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&redirect_uri=' +
      redirectURI +
      '&code=' +
      code +
      '&state=' +
      state;
    const options = {
      url: api_url,
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        token = body;
        res.redirect(`${reURI}/users/signin/naverlogin/callback/userinfo`);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  },
  userinfo: (req, res) => {
    const header = 'Bearer ' + JSON.parse(token).access_token; // Bearer 다음에 공백 추가
    const api_url = 'https://openapi.naver.com/v1/nid/me';
    const options = {
      url: api_url,
      headers: { Authorization: header },
    };
    request.get(options, async function (error, response, body) {
      if (!error && response.statusCode == 200) {
        userData = body;
        const {
          response: { id, name, email },
        } = JSON.parse(userData);
        const oauth = 'naver';
        try {
          await users
            .findOne({ where: { oauth, oauth_id: id } })
            .then((data) => {
              if (data) {
                user = data;
              } else {
                users
                  .create({
                    username: name,
                    oauth,
                    oauth_id: id,
                    email,
                  })
                  .then((data) => {
                    user = data;
                  });
              }
            });
        } catch (error) {
          console.error(error);
        }
        res.redirect(`${mainURI}/?naverlogin`);
      } else {
        console.log('error');
        if (response != null) {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
      }
    });
  },
  returnUser: (req, res) => {
    res.send(user);
  },
};
