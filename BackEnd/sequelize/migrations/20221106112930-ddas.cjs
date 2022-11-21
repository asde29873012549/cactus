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
	queryInterface.createTable('Chatroom', {
		id:{
			autoIncrement:true,
			primaryKey:true,
			type:Sequelize.INTEGER
		},
		createdAt:Sequelize.DATE,
		updatedAt:Sequelize.INTEGER,
		sender_id:Sequelize.INTEGER,
		receiver_id:Sequelize.INTEGER,
		listing_id:Sequelize.INTEGER,
		last_message:Sequelize.TEXT,
	})
	queryInterface.renameColumn('Messages', 'sender_id', 'user_id')
	queryInterface.removeColumn('Messages', 'receiver_id')
	queryInterface.removeColumn('Messages', 'listing_id')
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
