export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
}

export const HTTP_RESPONSE = {
  OK: (response, data) => {
    return response.status(HTTP_STATUS_CODE.OK).json({
      success: true,
      status: HTTP_STATUS_CODE.OK,
      statusMessage: 'SUCCESS',
      data
    })
  },
  CREATED: (response, data) => {
    return response.status(HTTP_STATUS_CODE.CREATED).json({
      success: true,
      status: HTTP_STATUS_CODE.CREATED,
      statusMessage: 'CREATED',
      data
    })
  },
  BAD_REQUEST: (response, message, errorData) => {
    return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      success: false,
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      statusMessage: 'BAD REQUEST',
      message,
      error: errorData
    })
  },
  UNAUTHORIZED: (response, message) => {
    return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
      success: false,
      status: HTTP_STATUS_CODE.UNAUTHORIZED,
      statusMessage: 'UNAUTHORIZED',
      message
    })
  },
  FORBIDDEN: (response, message) => {
    return response.status(HTTP_STATUS_CODE.FORBIDDEN).json({
      success: false,
      status: HTTP_STATUS_CODE.FORBIDDEN,
      statusMessage: 'FORBIDDEN',
      message
    })
  },
  NOT_FOUND: (response, message) => {
    return response.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      success: false,
      status: HTTP_STATUS_CODE.NOT_FOUND,
      statusMessage: 'NOT FOUND',
      message
    })
  },
  UNPROCESSABLE_ENTITY: (response, message, errorData) => {
    return response.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json({
      success: false,
      status: HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY,
      statusMessage: 'UNPROCESSABLE ENTITY',
      message,
      error: errorData
    })
  },
  INTERNAL_SERVER_ERROR: (response, message, error) => {
    return response.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      statusMessage: 'INTERNAL SERVER ERROR',
      message,
      error: error.message
    })
  }
}