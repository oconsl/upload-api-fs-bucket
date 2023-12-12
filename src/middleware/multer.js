import multer from 'multer'
import path from 'node:path'
import { VALID_EXTENSIONS } from '../helpers/valid-extensions.js'

const storage = multer.memoryStorage()

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    console.log('multer', file)
    if (!VALID_EXTENSIONS.includes(path.extname(file.originalname.toLowerCase()))) return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false)
    return cb(null, true)
  }
}).array('files')