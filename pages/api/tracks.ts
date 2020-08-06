import jwt from 'next-auth/jwt'
import { getSession } from 'next-auth/client'
import { default as api, Request, ErrorResponse } from '../../util/api'
import { spotify } from './_spotify'

const secret = process.env.JWT_SECRET

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

const handler = async (req: Request): Promise<TracksResponse|ErrorResponse> => {
  const token = await jwt.getToken({ req, secret })
  const {access_token, refresh_token} = token

  // console.log('JSON Web Token', JSON.stringify(token, null, 2))
  // console.log('Session', JSON.stringify(session, null, 2))
  // const access_token = 'test'
  // const refresh_token = 'test'
  
  spotify.setAccessToken(access_token)
  spotify.setRefreshToken(refresh_token)
  try {
    const [now_playing, recent] = await Promise.all([
      spotify.getMyCurrentPlayingTrack(),
      spotify.getMyRecentlyPlayedTracks(),
    ])

    return {
      now_playing: now_playing.body.item,
      recent: recent.body.items as PlayHistoryObject[],
    }

  } catch (err) {
    return { error: err }
  }
}

export default api(handler)

