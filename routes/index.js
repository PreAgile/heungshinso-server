const express = require("express");
const router = express.Router();
const models = require("../models");
const cookiemodule = require("cookie");

router.get("/", (req, res) => {
  // const returnUser = getcookie(req);
  // if(returnUser) {
  //   const cookies = cookiemodule.parse(returnUser[0].slice(10,returnUser[0].length));
  // }
  models.user
    .findAll()
    .then((userResult) => {
      if (userResult) {
        models.team.findAll().then((teamResult) => {
          if (teamResult) {
            const resultObj = {};
            resultObj["user"] = userResult;
            resultObj["team"] = teamResult;
            res.status(200).json(resultObj);
          } else {
            res.status(500).send("팀 데이터가 없습니다.");
          }
        });
      } else {
        res.status(500).send("유저 데이터가 없습니다.");
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

function getcookie(req) {
  const cookie = req.headers.cookie;
  // user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
  return cookie.split("; ");
}
module.exports = router;
