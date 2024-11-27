<template>
  <div v-if="movie" class="movie-detail">
    <div class="movie-backdrop">
      <img :src="movie.backdropUrl" :alt="movie.title" />
    </div>
    <div class="movie-content">
      <div class="movie-poster">
        <img :src="movie.thumbnailUrl" :alt="movie.title" />
      </div>
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.description }}</p>
        <div class="movie-meta">
          <span>장르: {{ movie.genre }}</span>
          <span>개봉년도: {{ movie.year }}</span>
          <span>평점: {{ movie.rating.toFixed(1) }}</span>
          <span>상영시간: {{ movie.runtime }}분</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tmdbService } from '../services/tmdbService'

const route = useRoute()
const router = useRouter()
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
const movie = ref(null)

onMounted(async () => {
  if (!currentUser.value) {
    router.push('/')
    return
  }

  const movieId = parseInt(route.params.id)
  movie.value = await tmdbService.fetchMovieDetails(movieId)
})
</script>