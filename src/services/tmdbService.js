import axios from 'axios'

const API_KEY = 'ebfffd8880333dd7775a29f2ecbe5872'
const BASE_URL = 'https://api.themoviedb.org/3'

export const tmdbService = {
    async fetchMovies(page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/popular`, {
                params: {
                    api_key: API_KEY,
                    language: 'ko-KR',
                    page: page
                }
            })

            // Promise.all()을 사용하여 비동기 처리
            const moviesWithGenres = await Promise.all(
                response.data.results.map(async (movie) => ({
                    id: movie.id,
                    title: movie.title,
                    description: movie.overview,
                    genre: movie.genre_ids.length > 0
                        ? await this.getGenreName(movie.genre_ids[0])
                        : '미분류',
                    year: movie.release_date.split('-')[0],
                    rating: movie.vote_average,
                    thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                }))
            )

            return moviesWithGenres
        } catch (error) {
            console.error('영화 데이터 fetching 중 오류:', error)
            return []
        }
    },

    async fetchMovieDetails(movieId) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                    language: 'ko-KR'
                }
            })
            const movie = response.data
            return {
                id: movie.id,
                title: movie.title,
                description: movie.overview,
                genre: movie.genres.map(g => g.name).join(', '),
                year: movie.release_date.split('-')[0],
                rating: movie.vote_average,
                runtime: movie.runtime,
                thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            }
        } catch (error) {
            console.error('영화 상세 정보 fetching 중 오류:', error)
            return null
        }
    },

    async getGenreName(genreId) {
        try {
            const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
                params: {
                    api_key: API_KEY,
                    language: 'ko-KR'
                }
            })
            const genre = response.data.genres.find(g => g.id === genreId)
            return genre ? genre.name : '미분류'
        } catch (error) {
            console.error('장르 정보 fetching 중 오류:', error)
            return '미분류'
        }
    }
}