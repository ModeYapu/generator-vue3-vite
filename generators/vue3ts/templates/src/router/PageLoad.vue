<template>
  <component :is="currPage"></component>
</template>
<script setup lang="ts">
import { onMounted, watch, shallowRef, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import Error from "@/views/Error.vue";
import { Loading } from "vant";
const route = useRoute();

const currPage = shallowRef();

onMounted(() => {
  loadPage();
});

watch(route.params, () => {
  loadPage();
});

const loadPage = async () => {
  const path = getPath();

  currPage.value = defineAsyncComponent({
    loader: () => import(`../views/${path}.vue`),
    loadingComponent: Loading,
    errorComponent: Error,
    // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
    delay: 200,
    // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
    // 默认值：Infinity（即永不超时，单位 ms）
    timeout: 3000,
    // 定义组件是否可挂起 | 默认值：true
    suspensible: false,
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // 请求发生错误时重试，最多可尝试 3 次
        retry();
      } else {
        // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
        // 必须调用其中一个才能继续错误处理。
        fail();
      }
    },
  });
};

const getPath = () => {
  debugger
  const params = route.params;
  const paths = [];
  for (let k in params) {
    paths.push(params[k]);
  }
  return paths.join("/");
};
</script>
<style scoped></style>
