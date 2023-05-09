'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	queryInterface.createTable('Messages', {
		id:{
			autoIncrement:true,
			primaryKey:true,
			type:Sequelize.INTEGER
		},	
		message:Sequelize.TEXT,
		sender_id:Sequelize.INTEGER,
		receiver_id:Sequelize.INTEGER,
		listing_id:Sequelize.INTEGER,
		chatroom_id:Sequelize.INTEGER
	})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
