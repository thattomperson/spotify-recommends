

{#if loading}
  <i transition:fade>Loading</i>
{/if}

<style>
  i {
    font-style: normal;
    font-size: 1.5em;
    color: var(--card-bg);
    margin: 10px;
  }
</style>


<script>
  import { fade } from 'svelte/transition';


  export let loading = false; 
</script>

