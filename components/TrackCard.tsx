

const TrackCard = (props: { track: SpotifyApi.TrackObjectFull }) => (
  <div className="track-card">
    <div className="track-art">
      <img
        srcSet={props.track.album.images.map(i => `${i.url} ${i.width}w`).join(',')}
        alt={props.track.album.name}
      />
    </div>
    <div className="track-details">
      <h1><a href={props.track.uri}>{props.track.name}</a></h1>
      <h2><a href={props.track.artists[0].uri}>{props.track.artists[0].name}</a></h2>
    </div>
  </div>
)


export default TrackCard