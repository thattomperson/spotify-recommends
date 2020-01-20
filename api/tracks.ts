import { NowRequest, NowResponse } from '@now/node'

import { spotify } from './_spotify'


export default (req: NowRequest, res: NowResponse) => {
  const { access_token, refresh_token } = JSON.parse(req.cookies.token)
  spotify.setAccessToken(access_token)
  spotify.setRefreshToken(refresh_token)

  Promise.all([
    spotify.getMyCurrentPlayingTrack(),
    spotify.getMyRecentlyPlayedTracks()
  ]).then(([{body: { item }}, {body: { items }}]) => {
    res.json({tracks: [
      { track: item },
      ...items
    ].filter(a => a.track.id)})
  })
}