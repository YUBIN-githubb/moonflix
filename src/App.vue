<template>
  <div id="app">
    <Header v-if="isLoggedIn" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Header from './components/Header.vue'
import './assets/styles/main.css'

const isLoggedIn = ref(!!localStorage.getItem('currentUser'))

watch(() => localStorage.getItem('currentUser'), () => {
  isLoggedIn.value = !!localStorage.getItem('currentUser')
})
</script>