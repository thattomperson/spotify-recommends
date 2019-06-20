<template>
<div class="recomended">
  <header class="header">
    <h1>Recommended</h1>
    <fa spin class="fader" :class="{show: loading.recommendations}" icon="sync-alt" />
  </header>
  <template v-if="recommendations.length > 0">
      <song-card ref="cards" @play="stopOthers(track)" :track="track" v-for="track in recommendations" :key="track.track.id" />
  </template>
  <template v-else>
    <div class="card" v-for="i in 20" :key="i" style="min-height: 10em;">
    </div>
  </template>

  <genre-list />
</div>
</template>

<script>
import GenreList from './GenreList'
import { mapGetters, mapActions } from 'vuex'
import SongCard from './SongCard'
export default {
  computed: {
    ...mapGetters([
      'recommendations',
      'loading'
    ]),
  },
  components: {
    SongCard,
    GenreList
  },
  methods: {
    ...mapActions({
      update: 'updateRecommendations'
    }),
    stopOthers(track) {
      for (let i = 0; i < this.$refs.cards.length; i++) {
        let card = this.$refs.cards[i];
        if (card._props.track.id !== track.id) {
          card.pause()
        }
      }
    }
  }
}
</script>

