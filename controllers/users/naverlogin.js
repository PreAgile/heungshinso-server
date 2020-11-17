require('dotenv').config();
const request = require('request');
const client_id = process.env.NAVER_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.NAVER_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
let state = '12345'; // random 문자열
const mainURI = 'https://d2z76t8ifhgwqt.cloudfront.net';
const redirectURI = encodeURI(
  'http://3.35.21.164:3000/users/signin/naverlogin/callback'
);
let api_url = '';
var token;
let userData;
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
        res.redirect(`http://3.35.21.164:3000/users/signin/naverlogin/callback/userinfo`);
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
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        userData = body;
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
    res.send(userData);
  },
};
