module.exports = (req, res) => {
  let session = req.session;
  console.log("cookieId: " + req.cookies.id);
  console.log(session);
  session.destroy();
  res.redirect("/");
  // res.status(205).send("성공적으로 로그아웃하였습니다.");
};
