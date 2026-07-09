import { Elysia } from 'elysia'

export type ApiResponse<T = unknown> = {
  success: boolean
  message: string
  data: T
}

export type AppResponse = {
  created: <T>(data: T, message?: string) => Response | Promise<Response>
  success: <T>(data: T, message?: string) => Response | Promise<Response>
  badRequest: (message: string) => Response | Promise<Response>
  unauthorized: (message: string) => Response | Promise<Response>
  forbidden: (message: string) => Response | Promise<Response>
  notFound: (message: string) => Response | Promise<Response>
  error: (message: string) => Response | Promise<Response>
}

const success = <T>(data: T, message = 'Request successful') =>
  Response.json(
    {
      success: true,
      message,
      data,
    } as ApiResponse<T>,
    { status: 200 },
  )

const created = <T>(data: T, message = 'Request successful') =>
  Response.json(
    {
      success: true,
      message,
      data,
    } as ApiResponse<T>,
    { status: 201 },
  )

const badRequest = (message: string) =>
  Response.json(
    {
      success: false,
      message,
    } as ApiResponse<null>,
    { status: 400 },
  )

const unauthorized = (message: string) =>
  Response.json(
    {
      success: false,
      message,
    } as ApiResponse<null>,
    { status: 401 },
  )

const forbidden = (message: string) =>
  Response.json(
    {
      success: false,
      message,
    } as ApiResponse<null>,
    { status: 403 },
  )

const notFound = (message: string) =>
  Response.json(
    {
      success: false,
      message,
    } as ApiResponse<null>,
    { status: 404 },
  )

const error = (message = 'Server error') =>
  Response.json(
    {
      success: false,
      message,
    } as ApiResponse<null>,
    { status: 500 },
  )

const appResponse: AppResponse = {
  created,
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  error,
}

export const response = new Elysia({ name: 'response' }).decorate(
  'response',
  appResponse,
)
