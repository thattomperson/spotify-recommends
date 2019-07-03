
{#if loading}
  <div transition:fade>
    <div class="spin">
      <Icon icon={faSyncAlt}/>
    </div>
  </div>
{/if}


<script>
  import { fade } from 'svelte/transition'
  import Icon from 'fa-svelte';
  import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

  export let loading = false; 
</script>



<style>
  div {
    display: inline-block;
    color: var(--card-bg);
    font-size: .75em;
  }
  .spin {
    animation: fa-spin 1s infinite linear;
  }

  @keyframes fa-spin{
    0%{
      transform:rotate(0deg)
    }
    100%{
      transform:rotate(359deg)
    }
  }
</style>

