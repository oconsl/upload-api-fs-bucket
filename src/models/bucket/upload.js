import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export class UploadModel {
  static async create (file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: new Date().getTime() + file.originalname,
      Body: file.buffer, //! MODIFICAR
    }

    const { Location } = await s3.upload(params).promise()

    return Location
  }

  static async readAll () {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
    }

    const { Contents } = await s3.listObjects(params).promise()

    return Contents
  }

  static async read (fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    }

    const { Body } = await s3.getObject(params).promise()

    return Body
  }

  static async delete (fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    }

    await s3.deleteObject(params).promise()

    return true
  }
}