import fs from 'node:fs'
import path from 'node:path'

export const deleteFile = (request, response, next) => {
  fs.unlink(path.join(process.cwd(), request.file.path), (error) => {
    if (error) {
      console.error(error)
      return response.status(500).send({
        message: 'Something went wrong'
      })
    }
  })

  next()
}