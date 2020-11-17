'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: '할말이없어요.',
        descrition: '흥신소 합니다..',
        team_region: '만나서합니다.',
        team_position: '주니어 개발자',
        userId: 777,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
