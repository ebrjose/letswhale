'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      accountHash: { type: DataTypes.STRING, allowNull: false },
      transactionHash: { type: DataTypes.STRING, allowNull: false, unique: true },
      token: { type: DataTypes.STRING, allowNull: false },
      amountHex: { type: DataTypes.STRING, allowNull: true },
      amountDec: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
      status: { type: DataTypes.ENUM('pending', 'success', 'error'), allowNull: false },
    },
    { sequelize, modelName: 'Transaction' }
  )
  return Transaction
}
