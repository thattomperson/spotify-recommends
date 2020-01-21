
<div id="app">
  <RecentList/>
  <RecommenedList/>
</div>

<script>
  import RecentList from './RecentList.svelte'
  import RecommenedList from './RecommenedList.svelte'
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Quicksand|Roboto&display=swap');

  :root {
    --background: #C9A2D2;
    --card-bg: #EBDDEE;
    --color: #404E88;
    --color-muted: rgba(64, 78, 136, .8);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    margin: 0;
    padding: 0;
    color: var(--color);
    background: var(--background);
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(a) {
    color: inherit;
  }

  :global(body) {
    margin: 15px;
  }

  :global(.btn) {
    background: transparent;
    display: block;
    border: none;
    height:25px;
    width:25px;
    padding: 5px;
  }

  :global(.btn svg) {
    width: 100%;
    height: 100%;
}

  #app {
    max-width: 1300px;
    margin: auto;
    display: flex;
    justify-content: space-around;
  }
</style>