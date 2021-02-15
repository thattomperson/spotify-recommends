import TrackCard from './TrackCard'
import { CircularProgress, Typography } from '@material-ui/core'
import Stack from './Stack'
import { useTracks } from '../data/tracks'


const RecentlyPlayedList = (props: { onRecommend: Function }) => {
  const { recent, now_playing, loading, isValidating } = useTracks();

  return <Stack>
    <Typography variant="h1" >now playing { isValidating && <CircularProgress size={20} color="secondary" /> }</Typography>
    <TrackCard track={now_playing} onRecommend={props.onRecommend}></TrackCard>
    <Typography variant="h1" >recently played</Typography>
    {
      loading
        ? Array(20).fill(null).map((item, index) => <TrackCard key={index}></TrackCard>)
        : recent.map(history => <TrackCard key={history.played_at} track={history.track} onRecommend={props.onRecommend}></TrackCard>)
    }
  </Stack>
}

export default RecentlyPlayedList