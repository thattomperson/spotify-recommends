import { NextApiRequest, NextApiResponse } from 'next'
import { spotify, state as expectedState } from './_spotify'
import { default as cookies, CookieMiddleware } from '../../util/middleware/cookies'

const handler = (req: NextApiRequest, res: CookieMiddleware<NextApiResponse>) => {
  spotify.setRedirectURI(`${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}/api/callback`)

  const { code, state } = req.query

  if (state !== expectedState) {
    res.writeHead(400, "Bad Request")
    res.end()
    return
  }

  spotify.authorizationCodeGrant(code)
    .then(({body: {access_token, refresh_token}}) => {
      res.cookie('token', JSON.stringify({access_token, refresh_token}))
      res.setHeader('Location', `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`)
      res.status(307);
      res.end()
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, 'Internal Server Error')
      res.end()
    })
}

export default cookies(handler)