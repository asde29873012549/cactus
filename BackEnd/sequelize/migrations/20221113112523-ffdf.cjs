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
	queryInterface.addColumn('Users', 'address', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Users', 'city', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Users', 'nation', {
		type:Sequelize.STRING
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
