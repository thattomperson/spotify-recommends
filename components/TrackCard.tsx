import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import QueueIcon from '@material-ui/icons/Queue';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const CardMedia = (props: {src?: string}) => <div className="card-media" style={{backgroundImage: `url("${props.src}")`}}></div>

export default function TrackCard(props: {
  track?: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend?: (track: Partial<SpotifyApi.TrackObjectFull>) => void;
}) {
  const [queueing, setQueueing] = useState(false);

  function queueSong(track: Partial<SpotifyApi.TrackObjectFull>) {
    setQueueing(true);
    fetch(`/api/queue?uri=${track.uri}`).then(() => setQueueing(false));
  }

  return (
    <div className="card">
      <CardMedia src={props?.track?.album?.images[0]?.url} />
      <div className="card-details">
        <div>
          <h5 className="dark:text-white">{props?.track?.name}</h5>
          <h6 className="text-gray-500 dark:text-gray-300">{props?.track?.artists[0]?.name}</h6>
        </div>
        {props.track ? (
          <div className="flex text-black dark:text-white ">
            <IconButton
              color="inherit"
              onClick={() => props.onRecommend(props.track)}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => queueSong(props.track)}
              aria-label="queue song"
            >
              {queueing ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <QueueIcon />
              )}
            </IconButton>
          </div>
        ) : ''
        }
      </div>
    </div>
  );
}
