import { NowRequest, NowResponse } from '@now/node'
import { spotify, state as expectedState } from './_spotify'
import { STATUS_CODES } from 'http'
import cookie from 'cookie'

export default (req: NowRequest, res: NowResponse) => {
  spotify.setRedirectURI(`${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}/api/callback`)

  const { code, state } = req.query

  if (state !== expectedState) {
    res.writeHead(400, "Bad Request")
    res.end()
    return
  }

  spotify.authorizationCodeGrant(code)
    .then(({body: {access_token, refresh_token}}) => {
      const setCookie = cookie.serialize('token', JSON.stringify({access_token, refresh_token}), {
        httpOnly: true,
        secure: req.headers['x-forwarded-proto'] === 'https',
        sameSite: true,
      })
      res.writeHead(307, STATUS_CODES[307], {
        'set-cookie': setCookie,
        'location': `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`
      });
      res.end()
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, 'Internal Server Error')
      res.end()
    })
}