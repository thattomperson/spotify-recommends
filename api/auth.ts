import { NowRequest, NowResponse } from '@now/node'
import { STATUS_CODES } from 'http'

import { spotify, scopes, state } from './_spotify'


export default (req: NowRequest, res: NowResponse) => {
  spotify.setRedirectURI(`${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}/api/callback`)

  // Create the authorization URL
  var authorizeURL = spotify.createAuthorizeURL(scopes, state, false);

  res.writeHead(307, STATUS_CODES[307], {
    'location': authorizeURL,
  })
  res.end()
}