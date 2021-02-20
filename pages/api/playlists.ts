import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type PlaylistResponseSuccess = {
  success: boolean;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

export type PlaylistResponse = PlaylistResponseSuccess;

const handler = async (req: Request): Promise<PlaylistResponse> => {
  const client = await spotify.api(req);

  const { body: results } = await client.getUserPlaylists();

  return {
    success: true,
    playlists: results.items,
  };
};

export default api(handler);
