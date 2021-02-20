import IconButton from './IconButton'
import { QueueIcon } from './icons';

import { useRecommended } from '../data/tracks';
import TrackCard from './TrackCard';
import CircularProgress from './CircularProgress';

const RecommendList = (props: {
  basedOn: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend: (track: Partial<SpotifyApi.TrackObjectFull>) => Promise<any>;
}) => {
  const { recommended, isValidating } = useRecommended(props.basedOn);

  const queueAll = async () => {
    for (let index = 0; index < recommended.length; index++) {
      const track = recommended[index];
      await fetch(`/api/queue?uri=${track.uri}`);
    }
  };

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
        <IconButton
          className='text-accent'
          style={{ float: 'right', margin: '4px' }}
          onClick={queueAll}
          aria-label="queue song"
        >
          <QueueIcon />
        </IconButton>
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
