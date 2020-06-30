import { default as api, Request } from '../../util/api'
import { spotify } from './_spotify'

export type TracksRequest = {}

export interface PlayHistoryObject {
  track: SpotifyApi.TrackObjectFull;
  played_at: string;
  context: SpotifyApi.ContextObject;
}

export type TracksResponse = {
  now_playing: SpotifyApi.TrackObjectFull,
  recent: PlayHistoryObject[]
}

const handler = async (req: Request): Promise<TracksResponse> => {
  const { access_token, refresh_token } = JSON.parse(req.cookies.token)
  spotify.setAccessToken(access_token)
  spotify.setRefreshToken(refresh_token)

  const [now_playing, recent] = await Promise.all([
    spotify.getMyCurrentPlayingTrack(),
    spotify.getMyRecentlyPlayedTracks(),
  ])

  return {
    now_playing: now_playing.body.item,
    recent: recent.body.items as PlayHistoryObject[],
  }
}

export default api(handler)

