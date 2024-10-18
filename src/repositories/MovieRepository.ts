import { Movie } from '../models/Movie'
import {
  type MovieInterface,
  type ProducersYearInterface,
} from '../interfaces/MovieInterface'
import db from '../database/connection'

export class MovieRepository {
  async findAll(): Promise<Movie[]> {
    return await new Promise((resolve, reject) => {
      db.all('SELECT * FROM movies', (error: Error, rows: MovieInterface[]) => {
        if (error !== null && error !== undefined) {
          reject(error)
          return
        }

        resolve(
          rows.map(
            (row: MovieInterface) =>
              new Movie(
                row.id,
                row.title,
                row.studios,
                row.producers,
                row.year,
                Boolean(row.winner)
              )
          )
        )
      })
    })
  }

  async findAllWinners(): Promise<ProducersYearInterface[]> {
    return await new Promise((resolve, reject) => {
      db.all(
        'SELECT producers, year FROM movies WHERE winner = 1 ORDER BY producers, year',
        (error: Error, rows: ProducersYearInterface[]) => {
          if (error !== null && error !== undefined) {
            reject(error)
            return
          }

          resolve(
            rows.map((row) => ({
              producers: row.producers,
              year: row.year,
            }))
          )
        }
      )
    })
  }

  async findById(id: number): Promise<Movie | null> {
    return await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM movies WHERE id = ?',
        [id],
        (error: Error, row: MovieInterface) => {
          if (error !== null && error !== undefined) {
            reject(error)
            return
          }

          if (row === undefined) {
            resolve(null)
            return
          }

          resolve(
            new Movie(
              row.id,
              row.title,
              row.studios,
              row.producers,
              row.year,
              Boolean(row.winner)
            )
          )
        }
      )
    })
  }

  async create(movie: Movie): Promise<Movie> {
    return await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO movies (title, studios, producers, year, winner) VALUES (?, ?, ?, ?, ?)',
        [
          movie.title,
          movie.studios,
          movie.producers,
          movie.year,
          movie.winner ? 1 : 0,
        ],
        function (error: Error) {
          if (error !== null && error !== undefined) {
            reject(error)
            return
          }

          resolve(
            new Movie(
              this.lastID,
              movie.title,
              movie.studios,
              movie.producers,
              movie.year,
              movie.winner
            )
          )
        }
      )
    })
  }

  async update(id: number, movie: Movie): Promise<Movie | null> {
    return await new Promise((resolve, reject) => {
      db.run(
        'UPDATE movies SET title = ?, studios = ?, producers = ?, year = ?, winner = ? WHERE id = ?',
        [
          movie.title,
          movie.studios,
          movie.producers,
          movie.year,
          movie.winner ? 1 : 0,
          id,
        ],
        function (error: Error) {
          if (error !== null && error !== undefined) {
            reject(error)
            return
          }

          if (this.changes === 0) {
            resolve(null)
            return
          }

          resolve(movie)
        }
      )
    })
  }

  async delete(id: number): Promise<number | null> {
    return await new Promise((resolve, reject) => {
      db.run('DELETE FROM movies WHERE id = ?', [id], function (error: Error) {
        if (error !== null && error !== undefined) {
          reject(error)
          return
        }

        if (this.changes === 0) {
          resolve(null)
          return
        }

        resolve(id)
      })
    })
  }
}
