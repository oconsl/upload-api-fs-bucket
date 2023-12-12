import { createAppServer } from './app.js'

import { UploadModel } from './src/models/local-fs/upload.js'

export const app = createAppServer({ uploadModel: UploadModel })