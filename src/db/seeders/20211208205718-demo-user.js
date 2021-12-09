'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'example@example.com',
      password: 'dasdfasfsdf',
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
