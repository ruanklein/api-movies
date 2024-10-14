import express from 'express'
import movieRoutes from './routes/movieRoutes'
import seed from './database/seed'
import { initializeDatabase } from './database/connection'

const PORT = 3000

const app = express()

app.use(express.json())
app.use('/movies', movieRoutes)

const main = async (): Promise<void> => {
  try {
    initializeDatabase()
  } catch (err) {
    console.error('Error initializing the database:', err)
  }

  try {
    await seed()
  } catch (err) {
    console.error('Error seeding the database:', err)
    return
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void main()
