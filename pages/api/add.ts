import SpotifyWebApi from 'spotify-web-api-node';
import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type AddResponseSuccess = {
  success: true;
};

export type AddResponseFail = {
  success: false;
  reason: 'no-playlist' | 'unknown' | 'duplicates';
};

export type AddResponse = AddResponseSuccess | AddResponseFail;

const noPlaylist = (): AddResponseFail => ({
  success: false,
  reason: 'no-playlist',
});

const unknownError = (): AddResponseFail => ({
  success: false,
  reason: 'unknown',
});

const duplicates = (): AddResponseFail => ({
  success: false,
  reason: 'duplicates',
});

const success = (): AddResponseSuccess => ({
  success: true,
});

async function getAllTracks(
  client: SpotifyWebApi,
  playlist_id: string
): Promise<SpotifyApi.TrackObjectFull[]> {
  const limit = 100;
  let offset = 0;
  let count = 0;
  let tracks = [];

  while (true) {
    const { body: page } = await client.getPlaylistTracks(playlist_id, {
      offset,
      limit,
    });

    count += page.items.length;

    offset += limit;

    page.items.forEach((item) => {
      tracks.push(item.track);
    });

    if (count >= page.total) {
      return tracks;
    }
  }
}

const handler = async (req: Request): Promise<AddResponse> => {
  const client = await spotify.api(req);

  const playlist_id = req.query.playlist
    ? req.query.playlist.toString()
    : (await client.getMyCurrentPlaybackState()).body.context?.uri
        .split(':')
        .pop();

  if (!playlist_id) {
    return noPlaylist();
  }

  const { body: me } = await client.getMe();
  const { body: playlist } = await client.getPlaylist(playlist_id);

  if (me.id !== playlist.owner.id && !playlist.collaborative) {
    return noPlaylist();
  }

  const uris = Array.isArray(req.query.uri) ? req.query.uri : [req.query.uri];

  const current_uris = (await getAllTracks(client, playlist.id)).map(
    (track) => track.uri
  );

  const uris_to_add = uris.filter((uri) => {
    return !current_uris.includes(uri);
  });

  if (uris_to_add.length === 0) {
    return duplicates();
  }

  await client.addTracksToPlaylist(playlist_id, uris_to_add);

  return success();
};

export default api(handler);
