
<div class="recent">
  <header class="header">
    <h1>Recently Played</h1>
    <LoadingIcon loading={$loadingRecent} />
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
  h1 {
    font-family: Quicksand;
  }

  .card {
    background: var(--card-bg);
  }
</style>

<script>
  import { recentTracks, loadingRecent } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import SongCard from './SongCard.svelte'
</script>

