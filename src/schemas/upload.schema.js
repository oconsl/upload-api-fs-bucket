import { z } from 'zod'
import { VALID_EXTENSIONS_REGEX, VALID_EXTENSIONS } from '../helpers/valid-extensions.js'

export const uploadSchema = z.array(z.object({
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number().max(10 * 1024 * 1024),
}))

export const paramsFileSchema = z.object({
  fileName: z.string().regex(VALID_EXTENSIONS_REGEX, `Invalid file extension. Valid extensions are ${VALID_EXTENSIONS.join(', ')}`),
})

export const validateUpload = (data) => {
  return uploadSchema.safeParse(data)
}

export const validateParams = (data) => {
  return paramsFileSchema.safeParse(data)
}