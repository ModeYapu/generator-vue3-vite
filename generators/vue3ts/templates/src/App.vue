<script setup lang="ts">
import { ref } from "vue";
import footerVue from './components/footer.vue';
import useShowFooter from './store/footer'
const { getShowFooter, $state } = useShowFooter()

</script>

<template>
  <router-view></router-view>
  <div id="teleport-target"></div>
  <footerVue v-if='getShowFooter' />
</template>

<style src="./assets/common.css">
</style>
