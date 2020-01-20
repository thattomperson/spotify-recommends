
import SpotifyWebApi from 'spotify-web-api-node'

export const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

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