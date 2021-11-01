<template>
  <router-view></router-view>
</template>
<script>
  import {
    useRouter
  } from "vue-router"
  export default {
    name: 'App',
    setup() {
      const router = useRouter()
      router.afterEach(() => {
        console.log('path::', router.currentRoute.value.path)
      })
    }
  }
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>