<template>
  <h1>consult</h1>
  <headerMenu></headerMenu>
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";

import { onMounted, onUnmounted, reactive, ref } from "vue";
import router from "../router";
import axios from "../utils/request";
import { Dialog as VantDialog } from "vant";

onMounted(() => {
  getProvinceList();
});

const getProvinceList = async () => {
  const res = await axios.post("/region/provinceList");
  console.log(res);
};
const getCityList = async (id: number) => {
  const res = await axios.post("/region/cityList", { provinceId: id });
  return res.data;
};

const overlayShow = ref(false);
const onSubmit = async () => {
  try {
    await axios.post("/appointment/generate", {});
  } catch (error) {
    return;
  }
};
const goBlack = () => {
  router.push("/");
};
</script>
<style lang="less" scoped></style>
