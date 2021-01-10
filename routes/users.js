const express = require('express');
const router = express.Router();
const multer = require('multer');
const users = require('../models').user;
const path = require('path');
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.normalize('./uploads'));
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
const upload = multer({ storage : storage });
const controller = require('../controllers/users/index');
const api = require('../controllers/api/index');
const callback = require('../controllers/users/callback');
const naver = require('../controllers/users/naverlogin');
const kakao = require('../controllers/users/kakaologin');

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.post('/signout', controller.signout);
router.post('/profile', upload.single('img'), controller.profile);
router.post('/uploadImg', upload.single('img'), controller.uploadImg);
router.get('/apply', api.apply);

// Oauth

router.get('/signin/callback', callback.get);
router.get('/signin/callback/userinfo', callback.userinfo);
router.get('/githublogin', callback.returnUser);
router.get('/githublogin/intro', callback.intro);
router.get('/signin/naverlogin', naver.get);
router.get('/signin/naverlogin/callback', naver.callback);
router.get('/signin/naverlogin/callback/userinfo', naver.userinfo);
router.get('/naverlogin', naver.returnUser);
router.get('/signin/kakaologin', kakao.get);
router.get('/signin/kakaologin/callback', kakao.callback);
router.get('/signin/kakaologin/callback/userinfo', kakao.userinfo);
router.get('/kakaologin', kakao.returnUser);

module.exports = router;
