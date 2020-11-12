'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'Justin',
        password: '123123',
        email: 'example@example.com',
        phone_number: '123123123',
        birthday: 123123,
        user_region: 'Austraila',
        user_position: 'back-end',
        user_status: 'ok',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
