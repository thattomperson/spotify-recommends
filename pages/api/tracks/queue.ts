import { default as api, Request } from '../../../util/api';
import * as spotify from '../../../util/spotify';

export type QueueResponse = {
  success: boolean;
};

const handler = async (req: Request) => {
  const client = await spotify.api(req);

  const uris = Array.isArray(req.query.uri) ? req.query.uri : [req.query.uri];
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i];
    await client.addTrackToQueue({ uri });
  }

  return {
    success: true,
  };
};

export default api<QueueResponse>(handler);
