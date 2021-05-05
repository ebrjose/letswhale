import { Transaction } from '../db/models'
import { dec2weihex, weihex2dec } from '../../assets/utils/number'
export async function getTransactions(req, res, next) {
  try {
    const transactions = await Transaction.findAll()
    res.json({
      data: transactions,
    })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function createTransaction(req, res) {
  const { accountHash, transactionHash, amountHex, amountDec } = req.body
  try {
    const transaction = await Transaction.create({
      accountHash,
      transactionHash,
      amountHex,
      amountDec,
    })

    res.json({
      message: 'Transaction created successfully',
      data: transaction,
    })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}

export async function transactionsSent(req, res) {
  const { account } = req.params
  try {
    const transactions = await Transaction.findAll({ where: { accountHash: account } })
    let total = 0
    transactions.forEach(it => {
      total += weihex2dec(it.amountHex)
    })
    res.json({ totalSent: total })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}
