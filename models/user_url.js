"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_URL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_URL.init(
    {
      domain: DataTypes.STRING,
      params: DataTypes.STRING,
      uniqchar: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "User_URL",
      tableName: "user_urls",
    }
  );
  return User_URL;
};
