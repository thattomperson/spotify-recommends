import { NextApiRequest, NextApiResponse } from 'next'

import { spotify } from './_spotify'


export default  (req: NextApiRequest, res: NextApiResponse) => {
  const { access_token, refresh_token } = JSON.parse(req.cookies.token)
  spotify.setAccessToken(access_token)
  spotify.setRefreshToken(refresh_token)
  
  spotify.getRecommendations({
    seed_tracks: [req.query.id],
  })
    .then(({body: { tracks }}) => {
      res.json({tracks})
    })
}