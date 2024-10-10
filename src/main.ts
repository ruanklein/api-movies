import express from 'express'
import seed from './database/seed'
import routes from './routes'

const PORT = 3000

const app = express()
app.use(express.json())

const main = async (): Promise<void> => {
  try {
    await seed()
  } catch (err) {
    console.error('Error seeding the database:', err)
    return
  }

  routes(app)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void main()
