
<div class="recent">
  <h1>recently played <LoadingIcon loading={$loading} /></h1>
  
  {#if $recentTracks.length > 0}
    {#each $recentTracks as track}
    <SongCard track={track.track}/>
    {/each}
  {:else}
    {#each "|".repeat(20).split('|') as i}
    <div class="card" style="min-height: 12em;" />
    {/each}
  {/if}

  <h1 class="made-with">made with <span>❤</span> by <a href="https://github.com/thattomperson">tom</a></h1>
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

  .made-with {
    text-align: center;
  }

  .made-with span {
    color: red;
  }
</style>

<script>
  import { recentTracks } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import SongCard from './SongCard.svelte'

  let loading = recentTracks.loading
</script>

