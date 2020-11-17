"use strict";
const crypto = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      birthday: DataTypes.INTEGER,
      user_region: DataTypes.STRING,
      user_position: DataTypes.STRING,
      user_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  //hook
  //회원가입할때시 비밀번호 해쉬
  user.addHook("beforeCreate", (data) => {
    let salt = "random string";
    let shasum = crypto.createHash("sha1");
    shasum.update(data.password + salt);
    data.password = shasum.digest("hex");
  });
  // 회원정보수정시 비밀번호 해쉬
  user.beforeBulkUpdate(async (data) => {
    let salt = "random string";
    let shasum = crypto.createHash("sha1");
    if (data.attributes.password) {
      await shasum.update(data.attributes.password + salt);
      data.attributes.password = shasum.digest("hex");
    }
  });
  return user;
};
