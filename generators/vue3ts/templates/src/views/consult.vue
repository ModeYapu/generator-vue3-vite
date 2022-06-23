<template>
  <h1>consult</h1>
  <headerMenu></headerMenu>
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";

import { onMounted } from "vue";
import router from "../router";
import axios from "../utils/request";

onMounted(() => {
  getProvinceList();
});

const getProvinceList = async () => {
  // 取消请求 例子
  const controller = new AbortController();
  const res = await axios.get("/region/provinceList", {
    signal: controller.signal
  });
  controller.abort();
};

const goBlack = () => {
  router.push("/");
};
</script>
<style lang="less" scoped></style>
