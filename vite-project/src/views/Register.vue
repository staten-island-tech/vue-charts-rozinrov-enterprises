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
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name.value
            }).then(() => {
                console.log('Successfully registered!')
                router.push(`/`)
            }).catch((error) => {
                console.error('Error updating user profile:', error)
            })
        })
        .catch((error) => {
            console.error('Error signing up with email and password:', error)
        })
}

</script>

<style scoped>

</style>