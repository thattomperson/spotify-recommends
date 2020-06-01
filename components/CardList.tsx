import TrackCard from './TrackCard'


const CardList = (tracks: SpotifyApi.TrackObjectSimplified[]) => (
  <div>
    {tracks.map(track => <TrackCard track={track}></TrackCard>)}
  </div>
)


export default CardList