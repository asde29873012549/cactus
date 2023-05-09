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
	 queryInterface.addColumn('Departments', 'createdAt', {
		type:Sequelize.DATE
	 });
	 queryInterface.addColumn('Departments', 'updatedAt', {
		type:Sequelize.DATE
	 });
	 queryInterface.addColumn('Departments', 'id', {
		type:Sequelize.DATE
	 });
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
