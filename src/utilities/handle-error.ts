import { Response, Request } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleError(error, _req: Request, res: Response, _next): Response {
  return res.status(error.statusCode || 500).send({ message: error.message })
}