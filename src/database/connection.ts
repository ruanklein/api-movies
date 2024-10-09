import sqlite3 from 'sqlite3'

const connection = new sqlite3.Database(':memory:')

export default connection
