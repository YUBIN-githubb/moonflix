<template>
  <div class="auth-container">
    <div v-if="!currentUser" class="login-form">
      <h2>로그인</h2>
      <input v-model="email" type="email" placeholder="이메일" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button @click="login">로그인</button>

      <h2>회원가입</h2>
      <input v-model="name" type="text" placeholder="이름" />
      <input v-model="email" type="email" placeholder="이메일" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button @click="register">회원가입</button>
    </div>
    <div v-else class="user-info">
      <p>{{ currentUser.name }}님 환영합니다!</p>
      <button @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
const email = ref('')
const password = ref('')
const name = ref('')

const register = () => {
  if (!email.value || !password.value || !name.value) {
    alert('모든 필드를 입력해주세요.')
    return
  }

  const existingUser = users.value.find(u => u.email === email.value)
  if (existingUser) {
    alert('이미 존재하는 이메일입니다.')
    return
  }

  const newUser = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    password: password.value
  }

  users.value.push(newUser)
  localStorage.setItem('users', JSON.stringify(users.value))
  alert('회원가입 성공!')

  email.value = ''
  password.value = ''
  name.value = ''
}

const login = () => {
  const user = users.value.find(
      u => u.email === email.value && u.password === password.value
  )

  if (user) {
    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))
    alert('로그인 성공!')
    window.location.href = '/movies'
  } else {
    alert('이메일 또는 비밀번호가 잘못되었습니다.')
  }
}

const logout = () => {
  currentUser.value = null
  localStorage.removeItem('currentUser')
  window.location.href = '/'
}
</script>

<style scoped>
/* 스타일은 main.css로 이동 */
</style>