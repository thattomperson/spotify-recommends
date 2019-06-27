
{#if loading}
  <div>
    <Icon icon={faSyncAlt}/>
  </div>
{/if}

<style>
  div {
    color: var(--card-bg);
    display: inline-block;

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
  import Icon from 'fa-svelte';
  import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

  export let loading = false; 
</script>

