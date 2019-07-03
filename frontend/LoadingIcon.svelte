
{#if loading}
  <div transition:fade>
    <div class="icon">
      <Icon icon={faSyncAlt}/>
    </div>
  </div>
{/if}

<style>
  div {
    display: inline-block;
  }
  .icon {
    color: var(--card-bg);
    font-size: .75em;
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


<script>
  import { fade } from 'svelte/transition'
  import Icon from 'fa-svelte';
  import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

  export let loading = false; 
</script>

