
import React, { useState } from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueIcon from '@material-ui/icons/Queue';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: '160px'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);



export default function TrackCard(props: { track?: SpotifyApi.TrackObjectSimplified, onRecommend?: Function }) {
  const classes = useStyles();
  const [queueing, setQueueing] = useState(false);


  function queueSong(track: SpotifyApi.TrackObjectSimplified) {
    setQueueing(true)
    fetch(`/api/queue?uri=${track.uri}`)
      .then(() => setQueueing(false))
  }

  return (
    <Card className={classes.root}>
      {props.track
        ? <CardMedia
            className={classes.cover}
            image={props?.track?.album?.images[0]?.url || 'https://placeholdmon.ttp.sh'}
            title={props?.track?.album?.name}
          />
        : <Skeleton className={classes.cover} height={160} width={160} />
      }
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props?.track?.name || <Skeleton height={29} width={180} />}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props?.track?.artists[0]?.name || <Skeleton height={25} width={'50%'} />}
          </Typography>
        </CardContent>

        {props.track ? <div className={classes.controls}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton onClick={() => props.onRecommend(props.track)} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={() => queueSong(props.track)} aria-label="queue song">
            {queueing ? <CircularProgress size={20} color="inherit" /> : <QueueIcon />}
          </IconButton>
        </div> :
        <div className={classes.controls}>
          <Skeleton width={36} height={36} style={{margin: '10px'}}></Skeleton>
          <Skeleton width={36} height={36} style={{margin: '10px'}}></Skeleton>
          <Skeleton width={36} height={36} style={{margin: '10px'}}></Skeleton>
        </div>
        }
      </div>
    </Card>
  );
}
