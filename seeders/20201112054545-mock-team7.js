'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: '할말이 있나요',
        descrition: '첨이에요',
        team_region: '반갑습니다.',
        team_position: '주니어 개발자',
        userId: 777,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
