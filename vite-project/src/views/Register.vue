<template>
    <div>
        <h1>Create an Account</h1>
        <input type="text" v-model="name" placeholder="Name" />
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button @click="register">Submit</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log('Successfully registered!')
            router.push('/')
        })
}

</script>

<style scoped>

</style>