import path from 'node:path'
import fs from 'node:fs/promises'

import getFileHash from '../../utils/getFileHash'
import processCsvFile from '../../helpers/processCsvFile'

const dataFilePath = path.resolve(__dirname, '../../../data')

describe('Data File Integration Tests', () => {
  it('should return the correct SHA256 sum for the data file', async () => {
    const dataFileSHA256SumFile = (
      await fs.readFile(path.resolve(dataFilePath, 'data.sha256sum'), 'utf-8')
    ).split(' ')[0]

    const dataFileSHA256Sum = await getFileHash(
      path.resolve(dataFilePath, 'data.csv')
    )

    expect(dataFileSHA256Sum).toBe(dataFileSHA256SumFile)
  })

  it('should return correct csv headers', async () => {
    const headers = (
      await processCsvFile(path.resolve(dataFilePath, 'data.csv'))
    )[0]

    expect(headers).toEqual(['year', 'title', 'studios', 'producers', 'winner'])
  })
})
