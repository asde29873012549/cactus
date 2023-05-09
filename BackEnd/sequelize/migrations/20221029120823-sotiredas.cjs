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
	queryInterface.createTable('Conditions', { id: {
		type : Sequelize.INTEGER,
		autoIncrement:true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	createdAt:Sequelize.DATE,
	updatedAt:Sequelize.DATE
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
