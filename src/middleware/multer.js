import multer from 'multer'
import path from 'node:path'
import { VALID_EXTENSIONS } from '../helpers/valid-extensions.js'

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  },
})

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (!VALID_EXTENSIONS.includes(path.extname(file.originalname))) return cb(null, false)
    return cb(null, true)
  }
}).single('file')