
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

      {#if player && track.preview_url}
        <Player src={track.preview_url} />
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

.actions .btn {
  margin-top: 1px;
  border: 1px solid var(--color);
  border-radius: 100%;
  width:25px;
  height:25px;
}

.actions .btn:first-child {
  margin-top: 0px;}


</style>

<script>
  import Player from './Player.svelte'
  import Icon from 'fa-svelte';
  import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
  
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

</script>

