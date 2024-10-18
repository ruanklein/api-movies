/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Movie } from '../models/Movie'
import { type MovieRepository } from '../repositories/MovieRepository'
import {
  type MovieInterface,
  type AwardInterval,
  type ProducersYearInterface,
} from '../interfaces/MovieInterface'

export class MovieService {
  movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.findAll()
  }

  async findAllWinnersIntervals(): Promise<{
    min: AwardInterval[]
    max: AwardInterval[]
  }> {
    const rows = await this.movieRepository.findAllWinners()

    const intervalsByProducer: Record<string, AwardInterval[]> = {}

    rows.forEach((row: ProducersYearInterface) => {
      const { producers, year } = row

      if (!intervalsByProducer[producers]) {
        intervalsByProducer[producers] = []
      }

      const wins = intervalsByProducer[producers]

      if (wins.length > 0) {
        const previousWin = wins[wins.length - 1].followingWin
        const interval = year - previousWin
        wins.push({
          producer: producers,
          interval,
          previousWin,
          followingWin: year,
        })
      } else {
        wins.push({
          producer: producers,
          interval: 0,
          previousWin: year,
          followingWin: year,
        })
      }
    })

    let min: AwardInterval[] = []
    let max: AwardInterval[] = []

    for (const producer in intervalsByProducer) {
      const intervals = intervalsByProducer[producer].filter(
        (i) => i.interval > 0
      )

      if (intervals.length > 0) {
        const minInterval = Math.min(...intervals.map((i) => i.interval))
        const maxInterval = Math.max(...intervals.map((i) => i.interval))

        const minIntervalData = intervals.find(
          (i) => i.interval === minInterval
        )
        const maxIntervalData = intervals.find(
          (i) => i.interval === maxInterval
        )

        if (minIntervalData) min.push(minIntervalData)
        if (maxIntervalData) max.push(maxIntervalData)
      }
    }

    min = min.sort((a, b) => a.interval - b.interval)
    max = max.sort((a, b) => b.interval - a.interval)

    return { min, max }
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
