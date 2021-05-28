import { Transaction } from '../db/models'
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
      total += it.amountDec / 1
    })
    res.json({ totalSent: total })
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error })
  }
}
