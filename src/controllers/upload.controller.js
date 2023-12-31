import { deleteFile as deleteMulterFile } from '../middleware/delete-file.js'
import { validateUpload, validateParams } from '../schemas/upload.schema.js'
import { HTTP_RESPONSE } from '../helpers/http-status.js'
import { VALID_EXTENSIONS } from '../helpers/valid-extensions.js'

export class UploadController {
  constructor({ uploadModel }) {
    this.uploadModel = uploadModel
  }

  create = async (request, response, next) => {
    try {
      console.log(request.files)

      if (!request.files) {
        return HTTP_RESPONSE.BAD_REQUEST(response, `Valid file is required. Please try again. Valid extensions are ${VALID_EXTENSIONS.join(', ')}`)
      }

      const result = validateUpload(request.files)

      if (!result.success) {
        return HTTP_RESPONSE.BAD_REQUEST(response, result?.message, result?.error?.message)
      }

      const newFiles = await this.uploadModel.create(request.files)

      return HTTP_RESPONSE.CREATED(response, newFiles)
    } catch (error) {
      next(error)
    }
  }

  list = async (_request, response, next) => {
    try {
      const files = await this.uploadModel.readAll()

      return HTTP_RESPONSE.OK(response, files)
    } catch (error) {
      next(error)
    }
  }

  read = async (request, response, next) => {
    try {
      const result = validateParams(request.params)

      if (!result.success) {
        return HTTP_RESPONSE.BAD_REQUEST(response, result?.message, result?.error?.message)
      }

      const file = await this.uploadModel.read(request.params.fileName)

      if (!file) {
        return HTTP_RESPONSE.NOT_FOUND(response, 'File not found')
      }

      return HTTP_RESPONSE.OK(response, {
        url: file
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (request, response, next) => {
    try {
      const result = validateParams(request.params)

      if (!result.success) {
        return HTTP_RESPONSE.BAD_REQUEST(response, result?.message, result?.error?.message)
      }

      await this.uploadModel.delete(request.params.fileName)

      return HTTP_RESPONSE.OK(response, 'File deleted')
    } catch (error) {
      next(error)
    }
  }
}