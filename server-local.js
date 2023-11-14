import { createAppServer } from './app.js'

import { UploadModel } from './src/models/local-fs/upload.js'

createAppServer({ uploadModel: UploadModel })