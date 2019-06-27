
<div class="card">
  <div class="card-img-cont" style="background-image:url({artwork.url})" />
  <div class="card-content">
    
      <div class="title">
        <h1><a href={track.uri}>{track.name}</a></h1>
        <h2><a href={artist.uri}>{artist.name}</a></h2>
      </div>
      {#if actions}
      <div class="actions">
        <button class="btn" on:click={recommend} title="Find related songs">
          <Icon icon={faSearch} />
        </button>
        <button class="btn" title="Add to current playlist">
          <Icon icon={faPlus} />
        </button>
      </div>
      {:else}
      <div></div>
      {/if}

      {#if player}
      <div class="flex">
        <audio src={track.preview_url} preload="metadata"></audio>

        
        <button class="btn" on:click={() => playing = !playing}>
          <Icon icon={playing ? faPause : faPlay } />
        </button>
        <progress max="1" value="0" />
      </div>
      {/if}
    


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

<style>
  h1, h2 {
    font-family: Quicksand;
    margin: 0; padding: 0;
  }
  h1 {
    color: var(--color);
  }
  h2 {
    color: var(--color-muted);
  }

  a {
    color: inherit;
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

.card h1, .card h2 {
  margin: 0 0 5px 0;
  font-family: 'Quicksand', sans-serif;
}

.card-content {
  padding: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-template-rows: 1fr 25px;
  align-items: stretch;
}

.btn {
  background: transparent;
  display: block;
  border: none;
  height:25px;
  width:25px;
  padding: 5px;
}

.btn :global(svg) {
  width: 100%;
  height: 100%;
}

.actions .btn {
  margin-top: 1px;
  border: 1px solid var(--color);
  border-radius: 100%;
  width:25px;
  height:25px;
}

.actions .btn:first-child {
  margin-top: 0px;
}

.flex {
  grid-column-end: 3;
  grid-column-start: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex progress {
    flex-grow: 1;
    height: 8px;
    border: 1px solid var(--color);
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;
}

progress[value]::-webkit-progress-value {
  background-color: var(--color);;
}

</style>

<script>
  import Icon from 'fa-svelte';
  import { faPlus, faSearch, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
  
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
  export let actions = true
  export let player = false

  let playing = false
</script>

