import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { serialize } from 'cookie'

type Options = {
  maxAge?: number,
  expires?: Date
}

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options: Options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options)
  return handler(req, res)
}

type Handler<T extends any> = (req: Request, res: Response<T>) => Promise<T>

export interface Request extends NextApiRequest {}
export interface Response<T> extends NextApiResponse<T> {
  cookie(name: string, data: string);
}

export default function handler<T>(handler: Handler<T>): NextApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    res.cookie = (name, value, options) => cookie(res, name, value, options)
    res.json(await handler(req, res as Response<T>))
    res.end()
  }
}