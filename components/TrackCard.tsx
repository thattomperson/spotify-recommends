import IconButton from './IconButton';
import { Queue, Search, Add } from './icons';
import Skeleton from 'react-loading-skeleton';

const CardMedia = (props: {src?: string}) => <div className="card-media" style={{backgroundImage: `url("${props.src}")`}}></div>

export default function TrackCard(props: {
  track?: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend?: (track: Partial<SpotifyApi.TrackObjectFull>) => Promise<any>;
}) {

  function queueSong(track: Partial<SpotifyApi.TrackObjectFull>) {
    return fetch(`/api/queue?uri=${track.uri}`);
  }

  function addSong(track: Partial<SpotifyApi.TrackObjectFull>) {
    return fetch(`/api/add?uri=${track.uri}`);
  }

  return (
    <div className="card">
      <CardMedia src={props?.track?.album?.images[0]?.url} />
      <div className="card-details">
        <div>
          <h5>{props?.track?.name}</h5>
          <h6>{props?.track?.artists[0]?.name}</h6>
        </div>
        {props.track ? (
          <div className="flex text-black dark:text-white space-x-1">
            <IconButton
              className="text-accent"
              onClick={() => props.onRecommend(props.track)}
              aria-label="search"
            >
              <Search />
            </IconButton>
            <IconButton
              className="text-accent"
              onClick={() => queueSong(props.track)}
              aria-label="queue song"
            >
              <Queue />
            </IconButton>
            <IconButton
              className="text-accent"
              onClick={() => addSong(props.track)}
              aria-label="add song to current playlist"
            >
              <Add />
            </IconButton>
          </div>
        ) : ''
        }
      </div>
    </div>
  );
}
