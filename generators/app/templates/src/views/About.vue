<!--  -->
<template>
    <div>About</div>
    <button @click="linkTo">Home</button>
</template>

<script>
    import {
        useRouter
    } from "vue-router"
    export default {
        name: 'About',
        setup() {
            const router = useRouter()
            const linkTo = () => {
                router.push({
                    path: '/home'
                })
            }
            return {
                linkTo
            }
        }
    }
</script>