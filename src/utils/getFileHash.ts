import { createHash } from 'crypto'
import { createReadStream } from 'fs'

const getFileHash = async (filePath: string): Promise<string> => {
  const hash = createHash('sha256')
  const stream = createReadStream(filePath)

  return await new Promise((resolve, reject) => {
    stream.on('data', (data) => hash.update(data))
    stream.on('end', () => {
      resolve(hash.digest('hex'))
    })
    stream.on('error', (err) => {
      reject(err)
    })
  })
}

export default getFileHash
