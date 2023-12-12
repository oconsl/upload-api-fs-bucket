import { Router } from 'express'
import { UploadController } from '../controllers/upload.controller.js'

export const createUploadRouter = ({ uploadModel }) => {
  const uploadRouter = Router()

  const uploadController = new UploadController({ uploadModel })

  uploadRouter.route('/upload')
    .get(uploadController.list)
    .post(uploadController.create)

  uploadRouter.route('/upload/:fileName')
    .get(uploadController.read)
    .delete(uploadController.delete)

  return uploadRouter
}