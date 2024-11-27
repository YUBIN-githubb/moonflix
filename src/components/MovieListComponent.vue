<template>
  <div class="movie-list">
    <h1>인기 영화</h1>
    <div v-if="loading" class="loading">
      영화 정보를 불러오는 중...
    </div>
    <div v-else class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="movie.thumbnailUrl" :alt="movie.title" />
        <div class="movie-details">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.description.slice(0, 100) }}...</p>
          <span>장르: {{ movie.genre }}</span>
          <span>개봉년도: {{ movie.year }}</span>
          <span>평점: {{ movie.rating.toFixed(1) }}</span>
          <div class="movie-actions">
            <router-link :to="`/movie/${movie.id}`" class="watch-btn">
              상세 보기
            </router-link>
            <button
                class="favorite-btn"
                @click="toggleFavorite(movie)"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  :fill="isFavorite(movie.id) ? 'pink' : 'none'"
                  stroke="pink"
                  stroke-width="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">이전</button>
      <span>{{ page }} 페이지</span>
      <button @click="nextPage">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { tmdbService } from '../services/tmdbService'

const router = useRouter()
const movies = ref([])
const loading = ref(true)
const page = ref(1)
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

const fetchMovies = async () => {
  loading.value = true
  movies.value = await tmdbService.fetchMovies(page.value)
  loading.value = false
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchMovies()
  }
}

const nextPage = () => {
  page.value++
  fetchMovies()
}

const toggleFavorite = (movie) => {
  const index = favorites.value.findIndex(f => f.id === movie.id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(movie)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const isFavorite = (movieId) => {
  return favorites.value.some(f => f.id === movieId)
}

watch(favorites, (newFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(newFavorites))
})

onMounted(() => {
  if (!currentUser.value) {
    router.push('/')
  } else {
    fetchMovies()
  }
})
</script>

<style scoped>
.movie-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0;
}

.favorite-btn svg {
  width: 100%;
  height: 100%;
}
</style>