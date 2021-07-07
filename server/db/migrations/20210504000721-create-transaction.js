'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      transactionHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amountHex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amountDec: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'success', 'error'),
        defaultValue: 'pending',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions')
  },
}
