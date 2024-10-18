/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MovieRepository } from '../../repositories/MovieRepository'
import { MovieService } from '../../services/MovieService'
import { Movie } from '../../models/Movie'
import { initializeDatabase } from '../../database/connection'
import { type AwardInterval } from '../../interfaces/MovieInterface'

const movieMock: Movie = {
  id: 1,
  title: 'The Matrix',
  producers: 'Joel Silver',
  studios: 'Warner Bros',
  year: 1999,
  winner: false,
}

describe('Movie Service Integration Tests', () => {
  let movieRepository: MovieRepository
  let movieService: MovieService

  beforeAll(() => {
    movieRepository = new MovieRepository()
    movieService = new MovieService(movieRepository)

    initializeDatabase()
  })

  it('should create a new movie', async () => {
    const movie = new Movie(
      movieMock.id,
      movieMock.title,
      movieMock.studios,
      movieMock.producers,
      movieMock.year,
      movieMock.winner
    )

    const newMovie = await movieService.create(movie)

    expect(newMovie).toBeInstanceOf(Movie)
    expect(newMovie).toMatchObject(movieMock)
  })

  it('should return a list of movies', async () => {
    const movies = await movieService.findAll()

    expect(Array.isArray(movies)).toBe(true)
    movies.forEach((movie) => {
      expect(movie).toBeInstanceOf(Movie)
    })
  })

  it('should return a movie by id', async () => {
    const movie = await movieService.findById(1)

    expect(movie).toBeInstanceOf(Movie)
    expect(movie).toMatchObject(movieMock)
  })

  it('should update a movie', async () => {
    let movie = (await movieService.findById(1))!

    movie.title = 'The Matrix Reloaded'
    movie.year = 2003

    const updatedMovie = await movieService.update(1, movie)
    movie = (await movieService.findById(1))!

    expect(updatedMovie).toBeInstanceOf(Movie)
    expect(updatedMovie).toMatchObject(movie)
  })

  it('should delete a movie', async () => {
    const deletedMovie = await movieService.delete(1)
    const movie = await movieService.findById(1)

    expect(deletedMovie).toBe(1)
    expect(movie).toBeNull()
  })

  it('should return the minimum and maximum interval between awards', async () => {
    const intervals: { min: AwardInterval[]; max: AwardInterval[] } =
      await movieService.getAwardIntervals()

    expect(intervals).toHaveProperty('min')
    expect(intervals).toHaveProperty('max')
    expect(intervals.min).toBeInstanceOf(Array)
    expect(intervals.max).toBeInstanceOf(Array)
  })
})
