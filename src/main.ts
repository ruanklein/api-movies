import express from 'express'
import seed from './database/seed'
import movieRoutes from './routes/movieRoutes'

const PORT = 3000

const app = express()

app.use(express.json())
app.use('/movies', movieRoutes)

const main = async (): Promise<void> => {
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
