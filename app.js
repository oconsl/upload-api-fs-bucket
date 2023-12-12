import express from 'express'
import { expressjwt as jwt } from 'express-jwt'
import { corsMiddleware } from './src/middleware/cors.js'
import { uploadMiddleware } from './src/middleware/multer.js'
import { createUploadRouter } from './src/routes/upload.router.js'
import { testServerRouter } from './src/routes/test-server.router.js'
import { errorHandler } from './src/middleware/error-handler.js'
import 'dotenv/config'

export const createAppServer = ({ uploadModel }) => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())
  app.use(uploadMiddleware)
  app.disable('x-powered-by')

  // app.all(
  //   '/api/*',
  //   jwt({
  //     secret: process.env.TOKEN_SECRET,
  //     algorithms: ['HS256'],
  //   })
  // )

  app.use('/api', createUploadRouter({ uploadModel }))
  app.use('/api', testServerRouter)

  app.use(errorHandler)

  const PORT = process.env.PORT || 3003

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

  return app
}

