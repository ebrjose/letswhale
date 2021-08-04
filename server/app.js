import express, { json } from 'express'
import { sequelize } from './db/models'
import transactionRoutes from './routes/transactions'
import cors from 'cors'

const app = express()

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://letswhale.com', 'https://letswhale.com'],
}
app.use(cors(corsOptions))

app.use(json())
app.use('/transactions', transactionRoutes)

export default app
