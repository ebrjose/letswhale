import { Router } from 'express'
const router = Router()

import {
  getTransactions,
  createTransaction,
  confirmTransaction,
  transactionsSent,
  transactionHistory,
} from '../controllers/TransactionController'

// /api/transactions

router.get('/', getTransactions)
router.post('/', createTransaction)
router.put('/:transactionHash/', confirmTransaction)

router.get('/sent/:account', transactionsSent)
router.get('/history/:account', transactionHistory)

module.exports = router
