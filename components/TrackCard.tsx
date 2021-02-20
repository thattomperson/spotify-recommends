import { queueTrack, addTrackToPlaylist } from '../data/tracks';
import IconButton from './IconButton';
import { Queue, Search, Add } from './icons';
import Skeleton from './Skeleton';

const CardMedia = (props: {src?: string}) => {
  return props.src
    ? <div className="card-media" style={{backgroundImage: `url("${props.src}")`}}></div>
    : <Skeleton width={160} height={160} className="card-media" />
}

export default function TrackCard(props: {
  track?: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend?: (track: Partial<SpotifyApi.TrackObjectFull>) => Promise<any>;
}) {
  return (
    <div className="card shadow">
      <CardMedia src={props.track?.album.images[0].url} />
      <div className="card-details">
        <div>
          <h5>{props.track?.name ?? <Skeleton width="80%" height={'2rem'}/>}</h5>
          <h6>{props.track?.artists[0].name ?? <Skeleton width="60%" height={'1.5rem'}/>}</h6>
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
              onClick={() => queueTrack(props.track)}
              aria-label="queue song"
            >
              <Queue />
            </IconButton>
            <IconButton
              className="text-accent"
              onClick={() => addTrackToPlaylist(props.track)}
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
