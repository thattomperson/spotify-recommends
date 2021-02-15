import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = {
  error: Error;
};

type Handler<T extends any> = (req: Request, res: Response<T>) => Promise<T>;

export type Request = NextApiRequest;
export type Response<T> = NextApiResponse<T>;

export default function handler<T>(
  handler: Handler<T | ErrorResponse>,
): NextApiHandler<T | ErrorResponse> {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<T | ErrorResponse>,
  ) => {
    let body;
    try {
      body = await handler(req, res as Response<T>);
    } catch (err) {
      console.error(err);
      res.status(401);
      body = {
        error: err,
      };
    } finally {
      res.json(body);
    }
  };
}
