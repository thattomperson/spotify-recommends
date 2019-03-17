<template>
<div class="recomended">
  <header>
    <h1>Recommended</h1>
    <button :disabled="loading.recommendations" class="btn" @click="update"><fa :spin="loading.recommendations" icon="sync-alt" /></button>
  </header>
  <template v-if="recommendations.length > 0">
      <recommended-card :track="track" v-for="track in recommendations" :key="track.id" />
  </template>
  <template v-else>
    <div class="card" v-for="i in 20" :key="i" style="min-height: 10em;">
    </div>
  </template>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import RecommendedCard from './RecommendedCard'
export default {
  computed: {
    ...mapGetters([
      'recommendations',
      'loading'
    ]),
  },
  components: {
    RecommendedCard,
  }
}
</script>

