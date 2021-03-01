import { default as api, Request } from '../../../../util/api';
import * as spotify from '../../../../util/spotify';

export type RecomendedResponse = {
  tracks: SpotifyApi.TrackObjectSimplified[];
};

const handler = async (req: Request): Promise<RecomendedResponse> => {
  const client = await spotify.api(req);

  const response = await client.getRecommendations({
    seed_tracks: req.query.id,
  });

  return {
    tracks: response.body.tracks,
  };
};

export default api<RecomendedResponse>(handler);
