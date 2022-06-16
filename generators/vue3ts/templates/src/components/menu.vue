<template>
  <div class="menu" @click="show = true">
    <img src="@/assets/img/header_menu.png" alt="menu" />
  </div>
  <teleport to="#teleport-target">
    <div
      class="wrapper"
      :style="{ height: state.wapperHeight }"
      v-if="show"
      @touchmove.prevent
      @mousewheel.prevent
    >
      <div class="block">
        <div class="justify-end">
          <img
            @click="show = false"
            class="close-menu"
            src="@/assets/img/menu_close.png"
            alt=""
          />
        </div>
        <div class="content">
          <div
            class="link justify-center"
            @click="goPath('https://baidu.com')"
          >
            <img src="@/assets/img/img_gxrz.png" alt="" />
            <span class="text">更新日志</span>
          </div>
          <div
            class="link justify-center"
            @click="goPath('https://baidu.com')"
          >
            <img src="@/assets/img/img_fwxy.png" alt="" />
            <span class="text">服务协议</span>
          </div>
          <div
            class="link justify-center"
            @click="goPath('https://baidu.com')"
          >
            <img src="@/assets/img/img_yszc.png" alt="" />
            <span class="text">隐私政策</span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
// const winHeight = ref(0);
const state = reactive({
  wapperHeight: "",
});
onMounted(() => {
  const winHeight =
    document.body.clientHeight || document.documentElement.clientHeight;
  state.wapperHeight = winHeight / 37.5 + "rem";
});
const show = ref(false);

const goPath = (path: string) => {
  if (path) {
    window.open(path);
  }
};
</script>
<style lang="less" scoped>
.menu {
  position: relative;
  img {
    width: 34px;
    height: 27px;
    margin: 31px 24px;
  }
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 17.8rem;
  width: 100%;
  background-color: #fff;
  opacity: 0.9;
  z-index: 99999;
}

.block {
  width: 100%;
  height: 100%;
  .close-menu {
    height: 40px;
    width: 40px;
    margin: 40px;
  }
  .content {
    margin-top: 260px;
    .link {
      margin-top: 80px;
      img {
        height: 48px;
        width: 48px;
      }
      .text {
        margin-left: 30px;
        font-size: 36px;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
