<template>
  <div class="recent">
    <header>
      <h1>Recently Played</h1>
      <fa spin class="fader" :class="{show: loading.tracks}" icon="sync-alt" />
    </header>
    <template v-if="tracks.length > 0">
      <recent-card :track="track" v-for="track in tracks" :key="track.track.id" />
    </template>
    <template v-else>
      <div class="card" v-for="i in 20" :key="i" style="min-height: 12em;">
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RecentCard from './RecentCard'
export default {
  computed: {
    ...mapGetters([
      'tracks',
      'loading'
    ]),
  },
  components: {
    RecentCard,
  }
}
</script>

