
<div class="recent">
  <header class="header">
    <h1>recently played <LoadingIcon loading={$loading} /></h1>
  </header>
  {#if $recentTracks.length > 0}
    {#each $recentTracks as track}
    <SongCard track={track.track}/>
    {/each}
  {:else}
    {#each "|".repeat(19).split('|') as i}
    <div class="card" style="min-height: 12em;" />
    {/each}
  {/if}
</div>

<!-- {@debug $recentTracks} -->

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
  import { recentTracks } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import SongCard from './SongCard.svelte'

  let loading = recentTracks.loading
</script>

