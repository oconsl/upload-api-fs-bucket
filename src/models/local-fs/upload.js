import fs from 'node:fs'
import { readJSON } from '../../utils/read-json.js'

const uploads = readJSON('../data/uploads.json')

export class UploadModel {
  static async create (file) {
    const newFile = {
      ...file,
      filename: new Date().getTime() + file.originalname
    }

    uploads.push(newFile)

    fs.writeFileSync('./src/data/uploads.json', JSON.stringify(uploads))

    return newFile
  }

  static async readAll () {
    return uploads
  }

  static async read (fileName) {
    const file = uploads.find((file) => file.filename === fileName)

    if (!file) return 'File not found'

    return file
  }

  static async delete (fileName) {
    const fileIndex = uploads.findIndex((file) => file.filename === fileName)

    if (fileIndex === -1) return false

    uploads.splice(fileIndex, 1)

    fs.writeFileSync('./src/data/uploads.json', JSON.stringify(uploads))

    return true
  }
}