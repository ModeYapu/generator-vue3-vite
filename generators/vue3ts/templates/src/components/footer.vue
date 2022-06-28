<template>
  <van-tabbar
    v-model="active"
    active-color="#14CE62"
    inactive-color="#666666"
    @change="onChange"
  >
    <van-tabbar-item icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item icon="search">Search</van-tabbar-item>
    <van-tabbar-item icon="friends-o">Friends</van-tabbar-item>
    <van-tabbar-item icon="setting-o">Setting</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const active = ref<number>(1);

const onChange = (index:number) => {
  changePageIndex(index);
};

const changePageIndex = (index:number) => {
  if (index === 0) {
    router.push({ name: "home-classroom" });
  } else if (index === 1) {
    router.push({ name: "user-info" });
  }
};

</script>
<style scoped>
</style>
