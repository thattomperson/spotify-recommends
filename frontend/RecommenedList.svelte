
<div class="recent">
  <h1>based on</h1>
  {#if $recommendedBasedOn}
  <SongCard track={$recommendedBasedOn} actions={false} />
  {:else}
  <div class="card"/>
  {/if}
  <h1>we recommend <LoadingIcon loading={$loading} /></h1>

  {#if $recommendedTracks.length > 0}
    {#each $recommendedTracks as track (track.track.id)}
    <SongCard track={track.track} player/>
    {/each}
  {:else}
    {#each "|".repeat(19).split('|') as i}
    <div class="card"/>
    {/each}
  {/if}
</div>

<!-- {@debug $recommendedTracks} -->

<style>
  .recent {
    min-width: 600px;
  }

  h1 {
    font-family: Quicksand;
  }

  .card {
    min-height: 12em;
    margin: 10px auto;
    background: var(--card-bg);
  }
</style>

<script>
  import { recommendedTracks, recommendedBasedOn } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import SongCard from './SongCard.svelte'

  let loading = recommendedTracks.loading
</script>

