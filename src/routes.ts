import { type Express } from 'express'

const routes = (app: Express): void => {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' })
  })
}

export default routes
