import { sequelize, Transaction } from '../db/models'
export async function getTransactions(req, res) {
  try {
    const transactions = await Transaction.findOne({
      where: { status: 'success' },
      attributes: [
        [sequelize.fn('count', sequelize.fn('distinct', sequelize.col('accountHash'))), 'total_investors'],
        [sequelize.fn('sum', sequelize.col('amountDec')), 'total_tvl'],
      ],
    })

    res.json({
      data: transactions,
    })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function createTransaction(req, res) {
  const { accountHash, transactionHash, token, amountDec, status = 'pending' } = req.body
  try {
    const transaction = await Transaction.create({
      accountHash,
      transactionHash,
      token,
      amountDec,
      status,
    })

    res.json({
      message: 'Transaction created successfully',
      data: transaction,
    })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function confirmTransaction(req, res) {
  const { transactionHash } = req.params
  const { status } = req.body
  const transactionStatus = status ? 'success' : 'error'

  try {
    const transaction = await Transaction.findOne({ where: { transactionHash: transactionHash } })
    transaction.status = transactionStatus
    await transaction.save()

    res.json({
      message: 'Transaction status has been updated',
    })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function transactionsSent(req, res) {
  const { account } = req.params
  try {
    const transactions = await Transaction.findAll({ where: { accountHash: account, status: 'success' } })
    let total = 0
    transactions.forEach(it => {
      total += it.amountDec / 1
    })
    res.json({ totalSent: total })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function transactionHistory(req, res) {
  const { account } = req.params
  try {
    const history = await Transaction.findAll({ where: { accountHash: account } })
    res.json({ history: history })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}
