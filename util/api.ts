import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { serialize } from 'cookie'

type Options = {
  maxAge?: number,
  expires?: Date
}

export type ErrorResponse = {
  error: Error
}

type Handler<T extends any> = (req: Request, res: Response<T>) => Promise<T>

export interface Request extends NextApiRequest {}
export interface Response<T> extends NextApiResponse<T> {}

export default function handler<T>(handler: Handler<T>): NextApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    res.json(await handler(req, res as Response<T>))
    res.end()
  }
}