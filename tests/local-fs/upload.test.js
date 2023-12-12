import request from 'supertest'
import { vi, beforeEach, expect, describe, it } from 'vitest'
import { app } from '../../server-local.js'
import { readJSON } from '@/utils/read-json.js'

const uploads = readJSON('../../src/data/uploads.json')
const testFilePath = 'tests/local-fs/test-file.png'

const mockUpload = {
  fieldname: 'file',
  originalname: 'file.png',
  encoding: '7bit',
  mimetype: 'image/png',
  filename: '1629785780000file.png',
  path: 'src/uploads/1629785780000file.png',
  size: 1234
}

describe('/api/upload [file system]', () => {
  describe('[GET] /api/upload', () => {
    it('should return status 200', async () => {
      const { status } = await request(app).get('/api/upload')

      expect(status).toBe(200)
    })

    it('should return an object with an empty array inside data field', async () => {
      const { body } = await request(app).get('/api/upload')

      const { data } = body

      expect(data).toEqual(uploads)
    })
  })

  describe('[POST] /api/upload', () => {
    it('should return status 201', async () => {
      const { status, body } = await request(app)
        .post('/api/upload')
        .attach('file', testFilePath)
        .set('Accept', 'multipart/form-data')

      console.log(body)

      expect(status).toBe(201)
    })
  })

  describe('[DELETE] /api/upload', () => {
    it('should return status 200', async () => {
      const { status, body } = await request(app).delete('/api/upload/test-file.png')

      console.log(body)

      expect(status).toBe(200)
    })
  })
})
