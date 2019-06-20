<template>
<div class="genres">
  <header class="header">
    <h1>Genres</h1>
  </header>
  <div class="card">
    <span class="chip" @click="update({genre})" v-for="genre in genres" :key="genre">{{ genre }}</span>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'genres',
      'loading'
    ]),
  },
  methods: {
    ...mapActions({
      update: 'updateRecommendations'
    })
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  background: var(--card-bg);
}

.chip {
  display: inline-block;
  margin: 2px;
}
</style>


