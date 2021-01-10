'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'users',
        'oauth',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'users',
        'oauth_id',
        {
          type: Sequelize.INTEGER,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'users',
        'img',
        {
          type: Sequelize.DataTypes.BLOB,
        },
        { transaction }
      );
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'oauth', { transaction });
      await queryInterface.removeColumn('users', 'oauth_id', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
