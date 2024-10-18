import { Router, type Request, type Response } from 'express'
import { MovieController } from '../controllers/MovieController'
import {
  showValidationRules,
  storeValidationRules,
  updateValidationRules,
  destroyValidationRules,
} from '../validators/MovieValidator'

const router = Router()
const movieController = new MovieController()

router.get('/', async (req, res) => {
  await movieController.index(req, res)
})

router.get('/winners-intervals', async (req, res) => {
  await movieController.getAwardIntervals(req, res)
})

router.get(
  '/:id',
  showValidationRules(),
  async (req: Request, res: Response) => {
    await movieController.show(req, res)
  }
)

router.post(
  '/',
  storeValidationRules(),
  async (req: Request, res: Response) => {
    await movieController.store(req, res)
  }
)

router.put(
  '/:id',
  updateValidationRules(),
  async (req: Request, res: Response) => {
    await movieController.update(req, res)
  }
)

router.delete(
  '/:id',
  destroyValidationRules(),
  async (req: Request, res: Response) => {
    await movieController.destroy(req, res)
  }
)

export default router
