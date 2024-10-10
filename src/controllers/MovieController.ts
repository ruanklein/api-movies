import { type Request, type Response } from 'express'
import { MovieService } from '../services/MovieService'
import { MovieRepository } from '../repositories/MovieRepository'
import { type MovieInterface } from '../interfaces/MovieInterface'

const movieRepository = new MovieRepository()
const movieService = new MovieService(movieRepository)

export class MovieController {
  async index(req: Request, res: Response): Promise<Response> {
    const movies = await movieService.findAll()
    return res.json(movies)
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const movie = await movieService.findById(Number(id))
    return res.json(movie)
  }

  async store(req: Request, res: Response): Promise<Response> {
    const movie = req.body as MovieInterface

    const newMovie = await movieService.create(movie)
    return res.json(newMovie)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const movie = req.body
    const updatedMovie = await movieService.update(movie)
    return res.json(updatedMovie)
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deletedMovieId = await movieService.delete(Number(id))
    return res.json(deletedMovieId)
  }
}
