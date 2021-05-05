import express, { json } from 'express'
const app = express()

// import routes
import transactionRoutes from './routes/transactions'

app.use(json())

app.use('/transactions', transactionRoutes)

export default app
