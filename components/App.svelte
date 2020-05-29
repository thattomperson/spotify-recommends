
<div id="app">
  <RecentList/>
  <RecommenedList/>
</div>

<script>
  import RecentList from './RecentList.svelte'
  import RecommenedList from './RecommenedList.svelte'
</script>

<style>
  #app {
    max-width: 1300px;
    margin: auto;
    display: flex;
    justify-content: space-around;
  }
</style>