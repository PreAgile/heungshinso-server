'use strict';
const { Deferrable } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      descrition: {
        type: Sequelize.STRING,
      },
      team_region: {
        type: Sequelize.STRING,
      },
      team_position: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: 'users',
        //   },
        //   key: 'id',
        //   deferrable: Deferrable.INITIALLY_IMMEDIATE,
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  },
};
