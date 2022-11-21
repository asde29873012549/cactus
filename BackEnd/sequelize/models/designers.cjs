'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Designers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Designers.init({
    name: DataTypes.STRING,
	logo:DataTypes.STRING,
	Introduction:DataTypes.TEXT,
	Banner:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Designers',
  });
  return Designers;
};