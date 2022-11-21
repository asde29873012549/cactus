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
	queryInterface.createTable('Colors', {id:{
		type:Sequelize.INTEGER,
		autoIncrement:true,
		primaryKey:true
	}, 
	name:Sequelize.STRING, 
	createdAt:Sequelize.DATE,
	updatedAt:Sequelize.DATE})

	queryInterface.renameColumn('Listings', 'Image', 'image_1')
	queryInterface.addColumn('Listings', 'image_2', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Listings', 'image_3', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Listings', 'image_4', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Listings', 'image_5', {
		type:Sequelize.STRING
	})
	queryInterface.addColumn('Listings', 'image_6', {
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
