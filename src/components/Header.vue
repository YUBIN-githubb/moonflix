<template>
  <header class="app-header">
    <nav>
      <div class="logo">
        <img src="C:\Users\ASUS\WebstormProjects\report\src\assets\icon\img.png" alt="Moonflix 로고" class="logo-img" />
      </div>
      <div class="nav-links">
        <router-link to="/movies">영화 목록</router-link>
        <router-link to="/favorites">찜한 영화</router-link>
        <button @click="logout" class="logout-btn">로그아웃</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background-color: #202020;
  color: white;
  padding: 15px;
}

.app-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 90px; /* 로고 이미지의 높이 조정 */
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #e50914;
}

.logout-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
}
</style>