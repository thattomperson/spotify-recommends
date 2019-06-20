
<div class="card">
  <div class="card-img-cont" style="background-image:url({artwork.url})" />
  <div class="card-content">
    <header>
      <h1>
        <a href={artist.uri}>{artist.name}</a>
        - 
        <a href={track.uri}><em>{track.name}</em></a>
      </h1>
      <div class="actions">
        <button class="action" on:click={recommend} title="Find related songs">
          <fa icon="search"/>
        </button>
        <button class="action" title="Add to current playlist">
          <fa icon="plus"/>
        </button>
      </div>
    </header>


  <!-- :style="`background-image: url(${track.track.album.images[0].url});`"> -->

    
    <!-- <player ref="player" @play="$emit('play')" @pause="$emit('pause')" v-if="track.track.preview_url" :src="track.track.preview_url" /> -->
    <!-- <div class="genres" v-if="genres.length && (genresOpen || genres.length < 3)">
      <span v-for="genre in genres" class="chip" :key="genre">{{ genre | title }}</span>
    </div>
    <div v-else>
      <span class="chip">{{ genres[0] | title }}</span>
      <span class="chip">{{ genres[1] | title }}</span>
      <span class="chip" @click="genresOpen = true">More <fa icon="plus" /></span>
    </div> -->
  </div>
</div>

<!-- {@debug $recentTracks} -->

<style>
  h1 {
    font-family: Quicksand;
    color: var(--color-muted);
    font-size: 1.75em;
    margin: 0; padding: 0;
  }

  a {
    color: inherit;
  }

  h1 em {
    color: var(--color);
    font-style: normal; 
  }

  
.card {
  display: flex;
  background: var(--card-bg);
  margin: 10px auto;
  max-width: 600px;
}

.card-img-cont {
  min-width: 12rem;
  min-height: 12rem;
  height: auto;
  overflow: hidden;
  background-size: cover;
}

.card-img {
  width: 100%;
}

.card h1, .card h3 {
  margin: 0 0 5px 0;
  font-family: 'Quicksand', sans-serif;
}

.card-content {
  padding: 1rem;
  width: 100%;
}

.card-content header {
  display: grid;
  grid-template-columns: 1fr 25px;
  align-items: stretch;
}

.actions .action {
  appearance: none;
  background: transparent;
  display: block;
  margin-top: 1px;
  border: 1px solid var(--color);
  border-radius: 100%;
  width:25px;
  height:25px;
}

.actions .action:first-child {
  margin-top: 0px;
}

.actions svg.svg-inline--fa {
  width: 100%;
  height: 100%;
  padding: 4px;
}

</style>

<script>
  import { recommendedBasedOn } from './store'

  $: album = track.album
  $: artwork = album.images[1]
  $: artist = track.artists[0]

  function recommend() {
    recommendedBasedOn.set(track)
  }

  export let track = {
    name: 'Unknown'
  }
</script>

