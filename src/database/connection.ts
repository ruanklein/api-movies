import sqlite3 from 'sqlite3'

const connection = new sqlite3.Database(':memory:')

export const initializeDatabase = (): void => {
  connection.serialize(() => {
    connection.run(
      'CREATE TABLE movies (id INTEGER PRIMARY KEY, title VARCHAR(40), studios VARCHAR(80), producers VARCHAR(80), year INTEGER, winner BOOLEAN )'
    )
  })
}

export default connection
