import { HTTP_RESPONSE } from '../helpers/http-status.js'
import { ZodError } from 'zod'

const ERROR_HANDLER = {
  validationError: (response, error) => {
    const message = 'Validation error on request'
    const errorData = error.issues.map((issue) => ({
      message: issue.message,
      path: issue.path
    }))
    return HTTP_RESPONSE.UNPROCESSABLE_ENTITY(response, message, errorData)
  },
  MulterError: (response, _error) => {
    const message = 'Provide a valid file to upload'
    return HTTP_RESPONSE.BAD_REQUEST(response, message, 'Invalid file extension')
  },
  UnauthorizedError: (response, error) => {
    const message = 'Provide a valid token to access this resource'
    return HTTP_RESPONSE.UNAUTHORIZED(response, message, error)
  },
  defaultError: (response, error) => {
    const message = 'Something went wrong'
    return HTTP_RESPONSE.INTERNAL_SERVER_ERROR(response, message, error)
  }
}

export const errorHandler = (error, _request, response, _next) => {
  let option = error?.name
  console.log(option)

  if (error instanceof ZodError) {
    option = 'validationError'
  }

  const handler = ERROR_HANDLER[option] ?? ERROR_HANDLER.defaultError
  handler(response, error)
}
