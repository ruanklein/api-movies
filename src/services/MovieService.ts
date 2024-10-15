import { type Movie } from '../models/Movie'
import { type MovieRepository } from '../repositories/MovieRepository'
import { type MovieInterface } from '../interfaces/MovieInterface'

export class MovieService {
  movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.findAll()
  }

  async findById(id: number): Promise<Movie | null> {
    return await this.movieRepository.findById(id)
  }

  async create(movie: MovieInterface): Promise<Movie> {
    return await this.movieRepository.create(movie)
  }

  async update(id: number, movie: MovieInterface): Promise<Movie | null> {
    return await this.movieRepository.update(id, movie)
  }

  async delete(id: number): Promise<number | null> {
    return await this.movieRepository.delete(id)
  }
}
