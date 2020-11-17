'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: '있나요',
        descrition: '프로젝트 팀입니다.',
        team_region: '원격입니다.',
        team_position: '주니어 개발자',
        userId: 5555,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
