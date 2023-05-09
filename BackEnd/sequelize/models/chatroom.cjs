'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chatroom.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    listing_id: DataTypes.INTEGER,
    last_message: DataTypes.TEXT,
	last_message_sender_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chatroom',
  });
  return Chatroom;
};