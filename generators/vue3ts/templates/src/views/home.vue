<template>
  <headerMenu />
  <h1>home</h1>
  <ConsultingService />
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";
import ConsultingService from "@/components/consulting-service.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import router from "../router";

const getImage = (name: string): string => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};
</script>
<style lang="less" scoped></style>
