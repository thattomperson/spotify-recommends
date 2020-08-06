
import { useSelector } from 'react-redux'
import TrackCard from './TrackCard'
import CircularProgress from '@material-ui/core/CircularProgress'

import { selectNowPlaying, selectRecent, selectRefreshing, PlayHistoryObject } from '../util/store/slices/songs'

const RecentlyPlayedList = () => {
  const recent : PlayHistoryObject[] = useSelector(selectRecent)
  const now_playing : SpotifyApi.TrackObjectFull | null = useSelector(selectNowPlaying)
  const refreshing : boolean = useSelector(selectRefreshing)

  return <div className="stack track-list">
    <h1>recently played { refreshing && <CircularProgress color="inherit" /> }</h1>
    

    { now_playing ? <TrackCard track={now_playing}></TrackCard> : null }
    {recent.map(history => <div key={history.played_at}>
      <TrackCard track={history.track}></TrackCard>
    </div>)}
  </div>
}

export default RecentlyPlayedList