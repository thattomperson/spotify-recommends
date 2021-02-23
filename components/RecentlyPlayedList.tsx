import CircularProgress from './CircularProgress'
import { useTracks } from '../data/tracks';
import TrackCard from './TrackCard';

const RecentlyPlayedList = (props: {
  onRecommend: (track: SpotifyApi.TrackObjectSimplified) => Promise<any>;
}) => {
  const { recent, now_playing, loading, isValidating } = useTracks();

  return (
    <div className="space-y-4">
      <h1>
        now playing{' '}
        {isValidating && <CircularProgress size={20} className="text-accent" />}
      </h1>
      <TrackCard
        track={now_playing}
        onRecommend={props.onRecommend}
      ></TrackCard>
      <h1>recently played</h1>
      { loading
        ? Array(20)
            .fill(null)
            .map((item, index) => <TrackCard key={index}></TrackCard>)
        : recent.map((history) => (
            <TrackCard
              key={history.played_at}
              track={history.track}
              onRecommend={props.onRecommend}
            ></TrackCard>
          ))}
    </div>
  );
};

export default RecentlyPlayedList;
