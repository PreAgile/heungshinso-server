const users = require("../../models").user;
const crypto = require("crypto");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const session = req.session;
  console.log("email: " + email, "password: " + password);
  console.log("session", session);
  //로그인할때시 비밀번호 해쉬
  let salt = "random string";
  let shasum = crypto.createHash("sha1");
  shasum.update(password + salt);
  let hashPassword = shasum.digest("hex");
  try {
    await users
      .findOne({ where: { email: email, password: hashPassword } })
      .then((user) => {
        if (!user) {
          res.status(404).send("해당하는 유저가 없거나 비밀번호가 틀립니다.");
        } else {
          session.userId = user.id;
          console.log(session.userId);
          res.cookie('id',session.userId);
          res.status(200).send(user);
        }
      });
  } catch (error) {
    res.status(500).send("서버에서 응답이 없습니다.");
    console.error(error);
  }
};
