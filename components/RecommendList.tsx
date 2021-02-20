import IconButton from './IconButton'
import { AddIcon, QueueIcon } from './icons';

import { useRecommended, addTracksToPlaylist, queueTracks } from '../data/tracks';
import TrackCard from './TrackCard';
import CircularProgress from './CircularProgress';

const RecommendList = (props: {
  basedOn: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend: (track: Partial<SpotifyApi.TrackObjectFull>) => Promise<any>;
}) => {
  const { recommended, isValidating } = useRecommended(props.basedOn);

  return (
    <div className="space-y-4">
      <h1>based on</h1>
      <TrackCard
        onRecommend={props.onRecommend}
        track={props.basedOn}
      ></TrackCard>
      <h1>
        we recommend{' '}
        {isValidating && <CircularProgress className="text-accent" size={20} />}

        <div className="flex" style={{float: 'right'}}>
          <IconButton
            className='text-accent'
            onClick={() => queueTracks(recommended)}
            aria-label="queue song"
          >
            <QueueIcon />
          </IconButton>
          <IconButton
            className='text-accent'
            onClick={() => addTracksToPlaylist(recommended)}
            aria-label="queue song"
          >
            <AddIcon />
          </IconButton>
        </div>
      </h1>
      {isValidating || recommended.length === 0
        ? Array(20)
            .fill(null)
            .map((item, index) => <TrackCard key={index}></TrackCard>)
        : recommended.map((track) => (
            <TrackCard
              key={track.id}
              onRecommend={props.onRecommend}
              track={track}
            ></TrackCard>
          ))}
    </div>
  );
};

export default RecommendList;
