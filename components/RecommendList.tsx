import TrackCard from './TrackCard'
import { CircularProgress, Typography } from '@material-ui/core'
import Stack from './Stack'
import { useTracks, useRecommended } from '../data/tracks';
import { useState } from 'react';


const RecommendList = (props: { basedOn: SpotifyApi.TrackObjectFull, onRecommend: Function }) => {
  const { now_playing } = useTracks();
  const basedOn = props.basedOn ?? now_playing
  const { recommended, loading } = useRecommended(basedOn)


  return <Stack>
    <Typography variant="h1" >based on</Typography>
    { basedOn ? <TrackCard onRecommend={props.onRecommend} track={basedOn}></TrackCard> : null }
    <Typography variant="h1" >we recommend { loading && <CircularProgress color="inherit" /> }</Typography>
    {recommended.map(track => <TrackCard key={track.id} onRecommend={props.onRecommend} track={track}></TrackCard>)}
  </Stack>
}

export default RecommendList