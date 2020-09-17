import TrackCard from './TrackCard'
import { CircularProgress, Typography } from '@material-ui/core'
import Stack from './Stack'
import { useTracks } from '../data/tracks'


const RecentlyPlayedList = (props: { onRecommend: Function }) => {
  const { recent, now_playing, loading } = useTracks();

  return <Stack>
    <Typography variant="h1" >now playing { loading && <CircularProgress color="inherit" /> }</Typography>
    <TrackCard track={now_playing} onRecommend={props.onRecommend}></TrackCard>
    <Typography variant="h1" >recently played</Typography>
    {recent.map(history => <TrackCard key={history.played_at} track={history.track} onRecommend={props.onRecommend}></TrackCard>)}
  </Stack>
}

export default RecentlyPlayedList