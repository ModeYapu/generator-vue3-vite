<template>
  <a :href="'#' + props.to">
    <solt />
  </a>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  to: { type: String, required: true },
});
</script>
