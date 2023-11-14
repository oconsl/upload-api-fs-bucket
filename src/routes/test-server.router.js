import { Router } from 'express'

const router = Router()

router.route('/ping')
  .get((_request, response) => {
    return response.json({ message: 'pong 🏓' })
  })

export {
  router as testServerRouter
}