<template>
  <div class="mod5 flex-col justify-center align-center" @click="goConsult()">
    <div class="section1 flex-col justify-between">
      <img
        class="icon1"
        referrerpolicy="no-referrer"
        src="@/assets/img/img_liuyan01.png"
      />
      <span class="infoBox1">
        产
        <br />
        品
        <br />
        咨
        <br />
        询
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "../router";
const goConsult = () => {
  router.push("/consult");
};
</script>
<style lang="less" scoped>
.mod5 {
  position: fixed;
  top: 362px;
  right: 20px;
  height: 188px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  width: 56px;
  margin: 276px 0 0 674px;
  z-index: 99999;
}

.section1 {
  width: 28px;
  height: 160px;
}

.icon1 {
  width: 28px;
  height: 28px;
}

.infoBox1 {
  width: 24px;
  height: 124px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(0, 104, 255, 1);
  font-size: 24px;
  font-family: MicrosoftYaHei;
  line-height: 31px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0 0 2px;
}
</style>
