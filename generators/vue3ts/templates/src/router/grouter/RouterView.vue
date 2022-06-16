<template>
  <component :is="comp"></component>
</template>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "./index";

const router: any = useRouter();

const comp = computed(() => {
  const route = router.routes.find(
    (route: any) => route.path === router.current.value
  );
  return route ? route.component : null;
});
</script>
<style scoped></style>
