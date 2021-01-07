require('dotenv').config();
const users = require('../../models').user;
const client_id = process.env.KAKAO_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.KAKAO_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
const axios = require('axios');
const qs = require('qs');
const mainUri = 'https://heungshinso.tk';
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
      .then(async (response) => {
        userData = response.data;
        const oauth_id = userData.id;
        const oauth = 'kakao';
        const {
          kakao_account: {
            profile: { nickname },
          },
        } = userData;
        const {
          kakao_account: { email },
        } = userData;
        try {
          await users.findOne({ where: { oauth, oauth_id } }).then((data) => {
            if (data) {
              userData = data;
            } else {
              users
                .create({
                  username: nickname,
                  oauth,
                  oauth_id,
                  email,
                })
                .then((data) => {
                  userData = data;
                });
            }
          });
        } catch (error) {
          console.error(error);
        }
        res.redirect(`https://heungshinso.ml/?kakaologin`);
      })
      .catch((err) => console.log(err));
  },
  returnUser: (req, res) => {
    res.send(userData);
  },
};
