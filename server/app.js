import express, { json } from 'express'
const app = express()
import { sequelize } from './db/models'
// import routes
import transactionRoutes from './routes/transactions'

sequelize.sync()

app.use(json())
app.use('/transactions', transactionRoutes)

export default app
