
import SpotifyWebApi from 'spotify-web-api-node'
import jwt from 'next-auth/jwt'
import { Request } from './api'
import WebApiRequest from 'spotify-web-api-node/src/webapi-request';
import HttpManager from  'spotify-web-api-node/src/http-manager';

export const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-currently-playing',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-read-playback-state'
]

export const state = 'testing'

type QueueOptions = {
  uri: string
} 

class Client extends SpotifyWebApi {
  /**
   * Starts o Resumes the Current User's Playback
   * @param {Object} [options] - Options, being device_id, context_uri, offset, uris.
   * @param {requestCallback} [callback] - Optional callback method to be called instead of the promise.
   * @example playbackResume({context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'}).then(...)
   * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
   *          otherwise an error. Not returned if a callback is given.
   */
  addTrackToQueue(options: QueueOptions, callback?: Function) {
    var queryParams = options.uri
      ? { uri: options.uri }
      : null;
    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v1/me/player/queue')
      .withQueryParameters(queryParams)
      .withHeaders({ 'Content-Type': 'application/json' })
      .build()
      .execute(HttpManager.post, callback);
  }
}

export async function api(req: Request): Promise<Client> {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET })

  const webApi = new Client({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
  })

  await webApi.refreshAccessToken();
  return webApi;
}