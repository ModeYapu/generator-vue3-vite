<template>
  <headerMenu />
  <h1>home</h1>
  <ConsultingService />
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";
import ConsultingService from "@/components/consulting-service.vue";
import useShowFooter from '../store/footer'

const { setShowFooter } = useShowFooter()
setShowFooter(true)
// 动态图片加载
const getImage = (name: string): string => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};
</script>
<style lang="less" scoped>
</style>
