import path from 'node:path'

import db from './connection'
import processCsvFile from '../helpers/processCsvFile'

const seed = async (): Promise<boolean> => {
  const records = (
    await processCsvFile(
      path.resolve(__dirname, '..', '..', 'data', 'data.csv')
    )
  ).slice(1) // Remove o cabeçalho

  const promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE movies (id INTEGER PRIMARY KEY, title VARCHAR(40), studios VARCHAR(80), producers VARCHAR(80), year INTEGER, winner BOOLEAN )'
      )

      db.run('BEGIN TRANSACTION')

      const stmt = db.prepare(
        'INSERT INTO movies (title, studios, producers, year, winner) VALUES (?, ?, ?, ?, ?)'
      )

      for (const [year, title, studios, producers, winner] of records) {
        stmt.run(title, studios, producers, year, winner === 'yes')
      }

      stmt.finalize((error) => {
        if (error !== null && error !== undefined) {
          reject(error)
          return
        }

        db.run('COMMIT')
        resolve(true)
      })
    })
  })

  return (await promise) as boolean
}

export default seed
