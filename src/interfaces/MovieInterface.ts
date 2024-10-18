export interface MovieInterface {
  id: number
  title: string
  studios: string
  producers: string
  year: number
  winner: boolean
}

export interface AwardInterval {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export interface ProducersYearInterface {
  producers: string
  year: number
}
