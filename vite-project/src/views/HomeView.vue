<template>
  <main class="background">
    <div class="fade-in margin">
      <nav>
          <a><RouterLink to="/">Home</RouterLink></a>
          <a><RouterLink to="/history">History</RouterLink></a>
          <a><RouterLink to="/data2">Pie Chart</RouterLink></a>
          <a><RouterLink to="/sign-in">Sign In</RouterLink></a>
          <a><RouterLink to="/register">Register</RouterLink></a>
          <button id="logout" @click="handleSignOut" v-if="isLoggedIn">Logout</button>
        </nav>
      <h1>Welcome to Rozinrov Enterprises {{ name }}!</h1>
      <h2>${{ funds.toLocaleString('en-US') }}</h2>
      <SearchForm :router="router" />
    </div>
  </main>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'


const user = getAuth().currentUser;
const store = useStore()
const funds = computed(() => store.state.funds)
const history = computed(() => store.state.history)
console.log(history.value)
const router = useRouter()

const name = user.displayName


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

main {
  text-align: center;  
  font-family: 'Kanit';
}

.background {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../public/nyc.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

h1, h2 {
  font-size: 56px;
  font-family: 'Kanit';
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.margin {
  margin-top: 15px;
}

.fade-in {
  animation: fade-in 1s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

a {
  font-size: 22px;
  color: white;
  text-decoration: none;
  transition: all 0.45s;
  margin-right: 30px;

}

a:hover {
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhs%0D%0AaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0%0D%0AaD0iMzkwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDM5MCA1MCIgZW5hYmxlLWJhY2tn%0D%0Acm91bmQ9Im5ldyAwIDAgMzkwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0i%0D%0Abm9uZSIgc3Ryb2tlPSIjZDk0ZjVjIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGlt%0D%0AaXQ9IjEwIiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMAoJYzEzLjc1LDAsMjguNzQtMzgu%0D%0ANzc4LDQ2LjE2OC0xOS40MTZDMTkyLjY2OSw0Ni41LDI0My42MDMsNDcuNTg1LDI2MCw0Ny41ODVj%0D%0AMzEuODIxLDAsMTMwLDAsMTMwLDAiLz4KPC9zdmc+Cg==");
  animation: line 3s;
  color: #d94f5c;
}

@keyframes line {
  0% {
    background-position-x: 490px;
  }
}
</style>
