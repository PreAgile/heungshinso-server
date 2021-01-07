module.exports = (req, res) => {
  let session = req.session;
  console.log("cookieId: " + req.cookies.id);
  console.log(session);
  session.destroy();
  res.redirect("/");
};
