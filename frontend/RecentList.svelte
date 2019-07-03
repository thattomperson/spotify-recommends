
<div class="recent">
  <h1>recently played <LoadingIcon loading={$loading} /></h1>
  
  {#if $recentTracks.length > 0}
    {#each $recentTracks as track (track.track.id)}
    <div out:fade animate:flip>
      <SongCard track={track.track}/>
    </div>
    {/each}
  {:else}
    {#each "|".repeat(20).split('|') as i}
    <div class="card" style="min-height: 12em;" />
    {/each}
  {/if}

  <h1>
    <span class="made-with">made with <span>❤</span> by <a href="https://github.com/thattomperson"  target="_blank">tom</a></span>
    <a href="https://github.com/thattomperson/spotify-recommends" target="_blank"><Icon icon={faGithub} /></a>
  </h1>
</div>

<style>
  .recent {
    min-width: 600px;
  }

  h1 {
    font-family: Quicksand;
    display: flex;
    justify-content: space-around;
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
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import { recentTracks } from './store'
  import LoadingIcon from './LoadingIcon.svelte'
  import Icon from 'fa-svelte'
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import SongCard from './SongCard.svelte'

  let loading = recentTracks.loading
</script>

