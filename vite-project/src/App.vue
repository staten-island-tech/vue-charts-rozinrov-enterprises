<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router';

const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(getAuth()).then(() => {
    router.push('/')
  })
}

</script>

<template>
  <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/history">History</RouterLink>
        <RouterLink to="/data2">Pie Chart</RouterLink>
        <RouterLink to="/">Sign In</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <button id="logout" @click="handleSignOut" v-if="isLoggedIn">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
