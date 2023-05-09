'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Listing.init({
    itemName: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    department_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    subCategory_id: DataTypes.INTEGER,
	designer_id: DataTypes.INTEGER,
	condition_id: DataTypes.INTEGER,
	image_1: DataTypes.STRING,
	image_2: DataTypes.STRING,
	image_3: DataTypes.STRING,
	image_4: DataTypes.STRING,
	image_5: DataTypes.STRING,
	image_6: DataTypes.STRING,
	user_id: DataTypes.INTEGER,
	SizeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};