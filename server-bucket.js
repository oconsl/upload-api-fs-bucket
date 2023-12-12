import { createAppServer } from './app.js'

import { UploadModel } from './src/models/bucket/upload.js'

export const app = createAppServer({ uploadModel: UploadModel })