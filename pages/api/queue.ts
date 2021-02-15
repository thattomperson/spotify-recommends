import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type QueueResponse = {
  success: boolean;
};

const handler = async (req: Request) => {
  const client = await spotify.api(req);

  await client.addTrackToQueue({
    uri: req.query.uri.toString(),
  });

  return {
    success: true,
  };
};

export default api<QueueResponse>(handler);
