'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: '잘부탁드립니다.',
        descrition: '프로젝트 팀입니다.',
        team_region: '만나서합니다.',
        team_position: '주니어 개발자',
        userId: 666,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
