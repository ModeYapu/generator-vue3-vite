<script setup lang="ts">
import { ref } from "vue";
import footerVue from './components/footer.vue';
const showFooter = ref(false)

</script>

<template>
  <router-view></router-view>
  <div id="teleport-target"></div>
  <footerVue v-if='showFooter' />
</template>

<style src="./assets/common.css">
</style>
