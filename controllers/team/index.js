const teams = require("../../models").team;

exports.createteam = async (req, res) => {
  const { title, description, team_region, team_position } = req.body;
  if (!title || !description || !team_region || !team_position) {
    res.status(422).send("정확히 입력해주세요.");
  } else {
    try {
      await teams
        .create({
          title: title,
          descrition: description,
          team_region: team_region,
          team_position: team_position,
        })
        .then((data) => {
          res.status(201).send(data);
        });
    } catch (error) {
      console.error(error);
    }
    res.send("createteam");
  }
};
