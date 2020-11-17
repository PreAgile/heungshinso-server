'use strict';
const { Deferrable } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      team_content_Id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: 'teams',
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
    await queryInterface.dropTable('user_teams');
  },
};
