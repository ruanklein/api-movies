import fs from 'node:fs'
import { parse } from 'csv-parse'

const processCsvFile = async (
  file: string,
  delimiter = ';'
): Promise<string[][]> => {
  const records: string[][] = []
  const parser = fs.createReadStream(file).pipe(parse({ delimiter }))

  for await (const record of parser) {
    records.push(record as string[])
  }

  return records
}

export default processCsvFile
