import { default as api, Request } from '../../../util/api';
import * as spotify from '../../../util/spotify';

export type TracksRequest = {};

export interface PlayHistoryObject {
  track: SpotifyApi.TrackObjectFull;
  played_at: string;
  context: SpotifyApi.ContextObject;
}

export type TracksResponse = {
  now_playing: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject;
  recent: PlayHistoryObject[];
  top: SpotifyApi.TrackObjectFull[]
};

const handler = async (req: Request): Promise<TracksResponse> => {
  const client = await spotify.api(req);

  const [now_playing, recent, top] = await Promise.all([
    client.getMyCurrentPlayingTrack(),
    client.getMyRecentlyPlayedTracks(),
    client.getMyTopTracks({ time_range: 'short_term', limit: 20 }),
  ]);

  return {
    now_playing: now_playing.body.item,
    recent: recent.body.items as PlayHistoryObject[],
    top: top.body.items,
  };
};

export default api<TracksResponse>(handler);
