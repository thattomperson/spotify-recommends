import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type QueueResponse = {
  success: boolean;
};

const handler = async (req: Request) => {
  const client = await spotify.api(req);

  const { body: results } = await client.getUserPlaylists({
    limit: 20,
    offset: 0,
  });

  return {
    success: true,
    playlists: results.items,
    meta: {
      total: results.total,
    },
  };
};

export default api<QueueResponse>(handler);
