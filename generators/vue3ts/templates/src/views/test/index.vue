<template>
  <div>
    <div>
      <p>{{ count }} * 2 = {{ double }}</p>
      <button @click="add">add</button>
    </div>
    <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/gvuex";

let store: any = useStore();
console.log("store", store);
let count = computed(() => store?.state?.count);

console.log("getters", store.getters.double);
let double = store.getters.double;
function add() {
  store.commit("add");
}

function asyncAdd() {
  store.dispatch("asyncAdd");
}
</script>
<style scoped></style>
