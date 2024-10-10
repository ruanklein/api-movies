export class Movie {
  id: number
  title: string
  studios: string
  producers: string
  year: number
  winner: boolean

  constructor(
    id: number,
    title: string,
    studios: string,
    producers: string,
    year: number,
    winner: boolean
  ) {
    this.id = id
    this.title = title
    this.studios = studios
    this.producers = producers
    this.year = year
    this.winner = winner
  }
}
