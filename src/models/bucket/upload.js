import { Upload } from '@aws-sdk/lib-storage'
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const MIME_TYPES = {
  'jpg': 'image/jpg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
  'pdf': 'application/pdf',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc': 'application/msword',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'csv': 'text/csv',
}

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
})

export class UploadModel {
  static async create (files) {
    const uploadPromises = files.map(async (file) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${new Date().getTime()}-${file.originalname}`,
        Body: file.buffer,
      }

      const { Location } = await new Upload({
        client: s3,
        params,
      }).done()

      return Location
    })

    const uploadResults = await Promise.all(uploadPromises)
    return uploadResults
  }

  static async readAll () {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
    }

    const { Contents } = await s3.listObjects(params)

    return Contents
  }

  static async read (fileName) {
    const fileExt = fileName.split('.').pop()

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ResponseContentType: MIME_TYPES[fileExt] || 'application/octet-stream',
    }

    const command = new GetObjectCommand(params)

    return await getSignedUrl(s3, command, { expiresIn: 30 })
  }

  static async delete (fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    }

    await s3.deleteObject(params)

    return true
  }
}