<!--  -->
<template>
  <div>About</div>
  <button @click="linkTo">Home</button>
  <HelloWorldVue />
</template>

<script setup>
import HelloWorldVue from "@/components/HelloWorld.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const linkTo = () => {
  router.push({
    path: "/home"
  });
};
</script>
