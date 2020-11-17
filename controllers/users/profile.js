const users = require('../../models').user;

module.exports = async (req, res) => {
  const {
    username,
    phone_number,
    birthday,
    user_region,
    user_position,
    user_status,
    email,
  } = req.body;
  try {
    await users
      .update(
        {
          username: username,
          phone_number: phone_number,
          birthday: birthday,
          user_region: user_region,
          user_position: user_position,
          user_status: user_status,
        },
        {
          where: {
            email: email,
          },
        }
      )
      .then((response) => {
        res.status(200).send('등록되었습니다.');
      });
  } catch (error) {
    res.status(401).send(error);
    console.error(error);
  }
};
