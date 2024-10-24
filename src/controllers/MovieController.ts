import { type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

import { MovieService } from '../services/MovieService'
import { MovieRepository } from '../repositories/MovieRepository'
import { type MovieInterface } from '../interfaces/MovieInterface'

const movieRepository = new MovieRepository()
const movieService = new MovieService(movieRepository)

export class MovieController {
  async index(req: Request, res: Response): Promise<void> {
    const movies = await movieService.findAll()
    res.json(movies)
  }

  async show(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    const { id } = req.params
    const movie = await movieService.findById(Number(id))

    if (movie === null) {
      res.status(404).json({ message: 'Movie not found' })
      return
    }

    res.json(movie)
  }

  async store(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    const movie = req.body as MovieInterface

    const newMovie = await movieService.create(movie)
    res.status(201).json(newMovie)
  }

  async update(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    const { id } = req.params
    const movie = req.body as MovieInterface
    const updatedMovie = await movieService.update(parseInt(id), movie)

    if (updatedMovie === null) {
      res.status(404).json({ message: 'Movie not found' })
      return
    }

    res.json(updatedMovie)
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    const { id } = req.params
    const deletedMovie = await movieService.delete(Number(id))

    if (deletedMovie === null) {
      res.status(404).json({ message: 'Movie not found' })
      return
    }

    res.status(204).end()
  }

  async getAwardIntervals(req: Request, res: Response): Promise<void> {
    const movies = await movieService.getAwardIntervals()
    res.json(movies)
  }
}
