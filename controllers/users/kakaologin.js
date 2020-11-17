require('dotenv').config();
const client_id = process.env.KAKAO_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.KAKAO_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
const axios = require('axios');
const qs = require('qs');
const mainUri = 'http://3.35.21.164:3000';
const redirectURI = encodeURI(`${mainUri}/users/signin/kakaologin/callback`);
let api_url = '';
let kakaoToken;
let userData;
module.exports = {
  get: (req, res) => {
    api_url =
      'https://kauth.kakao.com/oauth/authorize?client_id=' +
      client_id +
      '&redirect_uri=' +
      redirectURI +
      '&response_type=code';
    return res.redirect(api_url);
  },
  callback: (req, res) => {
    const { code } = req.query;
    const data = qs.stringify({
      code: code,
      grant_type: 'authorization_code',
      client_id: client_id,
      redirect_uri: redirectURI,
      client_secret: client_secret,
    });
    api_url = 'https://kauth.kakao.com/oauth/token';
    axios({
      method: 'post',
      url: api_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then((response) => {
        kakaoToken = response.data;
        res.redirect(`${mainUri}/users/signin/kakaologin/callback/userinfo`);
      })
      .catch((err) => console.log(err));
  },
  userinfo: (req, res) => {
    axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken['access_token']}`,
      },
    })
      .then((response) => {
        userData = response.data;
        res.redirect(`https://d2z76t8ifhgwqt.cloudfront.net/?kakaologin`);
      })
      .catch((err) => console.log(err));
  },
  returnUser: (req, res) => {
    res.send(userData);
  }
};
