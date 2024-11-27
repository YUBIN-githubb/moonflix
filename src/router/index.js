import { createRouter, createWebHistory } from 'vue-router'
import AuthComponent from '../components/AuthComponent.vue'
import MovieListComponent from '../components/MovieListComponent.vue'
import MovieDetailComponent from '../components/MovieDetailComponent.vue'
import FavoritesComponent from '../components/FavoritesComponent.vue'

const routes = [
    { path: '/', component: AuthComponent },
    { path: '/movies', component: MovieListComponent },
    { path: '/movie/:id', component: MovieDetailComponent, props: true },
    { path: '/favorites', component: FavoritesComponent }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router