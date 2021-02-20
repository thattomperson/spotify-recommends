import { default as api, Request } from '../../util/api';
import * as spotify from '../../util/spotify';

type QueueResponseSuccess = {
  success: true;
};

type QueueResponseFail = {
  success: false;
  reason: 'no-playlist';
};

type QueueResponse = QueueResponseSuccess | QueueResponseFail;

const handler = async (req: Request): Promise<QueueResponse> => {
  const client = await spotify.api(req);

  const { body: state } = await client.getMyCurrentPlaybackState();

  console.log(state);

  if (state.context.type === 'playlist') {
    const id = state.context.uri.split(':').pop();

    await client.addTracksToPlaylist(id, [req.query.uri.toString()]);

    return {
      success: true,
    };
  }

  return {
    success: false,
    reason: 'no-playlist',
  };
};

export default api(handler);
