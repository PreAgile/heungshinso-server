'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: '사람 구합니다.',
        descrition: '좋은사람으로요',
        team_region: '원격입니다.',
        team_position: '시니어 그자체.',
        userId: 4444,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
