"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  team.init(
    {
      title: DataTypes.STRING,
      descrition: DataTypes.STRING,
      team_region: DataTypes.STRING,
      team_position: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "team",
    }
  );
  return team;
};
