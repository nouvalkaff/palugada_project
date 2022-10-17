"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_url.init(
    {
      domain: DataTypes.STRING,
      params: DataTypes.STRING,
      uniqchar: DataTypes.STRING,
      crtdate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
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
  return user_url;
};
