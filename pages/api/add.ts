import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

export type QueueResponse = {
  success: boolean;
};

const handler = async (req: Request) => {
  const client = await spotify.api(req);

  const { body: state } = await client.getMyCurrentPlaybackState();

  if (state.context.type === 'playlist') {
    const id = state.context.uri.split(':').pop();
    await client.addTracksToPlaylist(id, [req.query.uri.toString()]);

    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};

export default api<QueueResponse>(handler);
