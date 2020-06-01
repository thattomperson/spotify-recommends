import { default as api, Request } from '../../util/api'
import { spotify } from './_spotify'

export type TracksRequest = {}

export type TracksResponse = {
  now_playing: SpotifyApi.TrackObjectSimplified,
  recent: SpotifyApi.PlayHistoryObject[]
}

export async function tracks() {
  const response = await fetch('/api/tracks')
  return (await response.json()) as TracksResponse
}

const handler = async (req: Request<TracksRequest>): Promise<TracksResponse> => {
  const { access_token, refresh_token } = JSON.parse(req.cookies.token)
  spotify.setAccessToken(access_token)
  spotify.setRefreshToken(refresh_token)

  const [now_playing, recent] = await Promise.all([
    spotify.getMyCurrentPlayingTrack(),
    spotify.getMyRecentlyPlayedTracks(),
  ])

  return {
    now_playing: now_playing.body.item,
    recent: recent.body.items,
  }
}

export default api(handler)
