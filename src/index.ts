import db from './database/connection'
import seed from './database/seed'

const main = async (): Promise<void> => {
  try {
    await seed()
  } catch (err) {
    console.error('Error seeding the database:', err)
    return
  }

  db.each('SELECT * FROM movies', (err, row) => {
    if (err !== null) {
      throw err
    }
    console.log(row)
  })
}

void main()
