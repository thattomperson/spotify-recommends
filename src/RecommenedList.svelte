
<div class="recent">
  <header class="header">
    <h1>Recommeneded based on {basedOnName} </h1>
    <LoadingIcon loading={$loadingRecommended} />
  </header>
  {#if $recommendedTracks.length > 0}
    {#each $recommendedTracks as track}
    <SongCard track={track.track}/>
    {/each}
  {:else}
    {#each "|".repeat(19).split('|') as i}
    <div class="card" style="min-height: 12em;" />
    {/each}
  {/if}
</div>

<!-- {@debug $recommendedTracks} -->

<style>
  h1 {
    font-family: Quicksand;
  }

  .card {
    background: var(--card-bg);
  }
</style>

<script>
  import { recommendedTracks, loadingRecommended, recommendedBasedOn } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import SongCard from './SongCard.svelte'

  let basedOnName = '?'

  recommendedBasedOn.subscribe(v => {
    if (v) {
      basedOnName = v.name
    }
  })
</script>

