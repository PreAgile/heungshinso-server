const teams = require("../../models").team;

module.exports = async (req, res) => {
  const { team_region, team_position } = req.query;
  try {
    if (!team_region && !team_position) {
      await teams.findAll().then((output) => res.send(output));
    } else if (team_region && !team_position) {
      await teams
        .findAll({ where: { team_region: team_region } })
        .then((output) => res.send(output));
    } else if (!team_region && team_position) {
      await teams
        .findAll({ where: { team_position: team_position } })
        .then((output) => res.send(output));
    } else {
      await teams
        .findAll({
          where: { team_region: team_region, team_position: team_position },
        })
        .then((output) => res.send(output));
    }
  } catch (error) {
    console.error();
  }
};
