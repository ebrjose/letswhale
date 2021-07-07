import { Router } from 'express'
const router = Router()

import {
  getTransactions,
  createTransaction,
  confirmTransaction,
  transactionsSent,
} from '../controllers/TransactionController'

// /api/transactions

router.get('/', getTransactions)
router.post('/', createTransaction)
router.put('/:transactionHash/', confirmTransaction)

router.get('/sent/:account', transactionsSent)

module.exports = router
