<template>
    <div>
        <h1>Sign In</h1>
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <p v-if="errMsg">{{ errMsg }}</p>
        <button @click="register">Submit</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const name = ref('')
const email = ref('')
const password = ref('')
const errMsg = ref('')
const router = useRouter()

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log('Successfully signed in!')
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code) 
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errMsg.value = 'Nonexistent account'
                    break
                case 'auth/wrong-passowrd':
                    errMsg.value = 'Incorrect password'
                    break
                default:
                    errMsg.value = 'Email or password was incorrect'
                    break
            }
        })
}

</script>

<style scoped>

</style>