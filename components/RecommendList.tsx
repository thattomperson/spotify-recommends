import TrackCard from './TrackCard'
import { CircularProgress, IconButton, Typography } from '@material-ui/core'
import Stack from './Stack'
import { useTracks, useRecommended } from '../data/tracks';
import { useState } from 'react';
import QueueIcon from '@material-ui/icons/Queue';


const RecommendList = (props: { basedOn: SpotifyApi.TrackObjectFull, onRecommend: Function }) => {
  const { now_playing } = useTracks();
  const basedOn = props.basedOn ?? now_playing
  const { recommended, loading } = useRecommended(basedOn)
  const [queueing, setQueueing] = useState(false)

  const queueAll = async () => {
    setQueueing(true)
    for (let index = 0; index < recommended.length; index++) {
      const track = recommended[index];
      await fetch(`/api/queue?uri=${track.uri}`)
    }
    setQueueing(false);
  }


  return <Stack>
    <Typography variant="h1" >based on</Typography>
    { basedOn ? <TrackCard onRecommend={props.onRecommend} track={basedOn}></TrackCard> : null }
    <Typography variant="h1" >we recommend { loading && <CircularProgress color="inherit" size={20} /> }
      <IconButton style={{float: 'right', margin: '4px'}} onClick={queueAll} aria-label="queue song">
        {queueing ? <CircularProgress size={20} color="inherit" /> : <QueueIcon />}
      </IconButton>
    </Typography>
    {recommended.map(track => <TrackCard key={track.id} onRecommend={props.onRecommend} track={track}></TrackCard>)}
  </Stack>
}

export default RecommendList