import { createAppServer } from './app.js'

import { UploadModel } from './src/models/bucket/upload.js'

createAppServer({ uploadModel: UploadModel })