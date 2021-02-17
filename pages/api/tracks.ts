import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type TracksRequest = {};

export interface PlayHistoryObject {
  track: SpotifyApi.TrackObjectFull;
  played_at: string;
  context: SpotifyApi.ContextObject;
}

export type TracksResponse = {
  now_playing: SpotifyApi.TrackObjectFull;
  recent: PlayHistoryObject[];
};

const handler = async (req: Request) => {
  const client = await spotify.api(req);

  const [now_playing, recent] = await Promise.all([
    client.getMyCurrentPlayingTrack(),
    client.getMyRecentlyPlayedTracks(),
  ]);

  return {
    now_playing: now_playing.body.item,
    recent: recent.body.items as PlayHistoryObject[],
  };
};

export default api<TracksResponse>(handler);
