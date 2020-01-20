import { NowRequest, NowResponse } from '@now/node'

import { spotify } from './_spotify'


export default (req: NowRequest, res: NowResponse) => {
  const { access_token, refresh_token } = JSON.parse(req.cookies.token)
  spotify.setAccessToken(access_token)
  
  spotify.getRecommendations({
    seed_tracks: [req.query.id],
  })
    .then(({body: { tracks }}) => {
      res.json({tracks})
    })
  // res.end()
}