import { Router } from 'express'
const router = Router()

import { getTransactions, createTransaction, transactionsSent } from '../controllers/TransactionController'

// /api/projects
// router.get('/', getTransactions)
router.post('/', createTransaction)

router.get('/sent/:account', transactionsSent)

module.exports = router
