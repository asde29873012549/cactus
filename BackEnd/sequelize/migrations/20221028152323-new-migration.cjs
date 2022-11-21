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
	 await queryInterface.removeColumn('Listings', 'category')
	 await queryInterface.removeColumn('Listings', 'subCategory')
	 await queryInterface.addColumn('Listings', 'category_id',{
		type: Sequelize.DataTypes.STRING
	  })
	 await queryInterface.addColumn('Listings', 'subCategory_id',{
		type: Sequelize.DataTypes.STRING
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
