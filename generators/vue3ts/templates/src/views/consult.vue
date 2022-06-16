<template>
  <div class="consult-header justify-between">
    <div class="logo">
      <div class="justify-start" @click="goBlack()">
        <img src="@/assets/img/img_logo.png" alt="logo" />
      </div>

      <span class="title">易校园思政云 产品讲解预约</span>
    </div>
    <headerMenu></headerMenu>
  </div>
  <!-- form -->

  <div class="form-content">
    <div class="content">
      <div class="title">
        填写信息后，您的学校可获得专属客服【一对一讲解】服务
      </div>
      <div class="form">
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">您的名字</span>
        </div>
        <div class="flex-col">
          <input
            class="outer3 word3"
            v-model="state.userName"
            placeholder="希望我们如何称呼您"
            type="text"
          />
        </div>
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">手机</span>
        </div>
        <div class="flex-col">
          <input
            class="outer3 word3"
            v-model="state.phoneNumber"
            placeholder="顾问将于 1-2 个工作日内给您致电"
            type="text"
          />
        </div>
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">学校名称</span>
        </div>
        <div class="flex-col">
          <input
            class="outer3 word3"
            v-model="state.schoolName"
            placeholder="请提供完整的学校名称"
            type="text"
          />
        </div>
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">城市选择</span>
        </div>
        <div class="flex-col">
          <input
            class="outer3 word3"
            v-model="fieldValue"
            placeholder="选择省份-城市"
            type="text"
            @click="show = true"
          />
          <!-- <span class="word3">选择省份-城市</span> -->
          <!-- <van-field
            v-model="fieldValue"
            is-link
            readonly
            label="地区"
            placeholder="请选择所在地区"
            @click="show = true"
          /> -->
          <van-popup v-model:show="show" round position="bottom">
            <van-cascader
              v-model="cascaderValue"
              title="请选择所在地区"
              :options="state.provinceOptions"
              @close="show = false"
              @change="onChange"
              @finish="onFinish"
            />
          </van-popup>
        </div>
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">贵校是否已付费采购&nbsp;易校园思政云</span>
        </div>
        <div class="flex-row">
          <van-radio-group v-model="state.isPay" direction="horizontal">
            <van-radio :name="true" style="margin: 12px; font-size: 14px"
              >是</van-radio
            >
            <van-radio :name="false" style="margin: 12px; font-size: 14px"
              >否</van-radio
            >
          </van-radio-group>
        </div>
        <div class="outer2 flex-row justify-between">
          <span class="txt1">*</span>
          <span class="txt2">希望使用的场景（可多选）</span>
        </div>
        <div class="flex-row">
          <van-checkbox-group v-model="senceChecked">
            <van-checkbox
              style="margin: 12px 0; font-size: 14px"
              :name="item"
              v-for="item in state.senceOptions"
              :key="item"
              shape="square"
              >{{ item }}</van-checkbox
            >
          </van-checkbox-group>
        </div>

        <button
          class="group3 flex-col justify-center align-center"
          @click="onSubmit"
        >
          <span class="word14">提交</span>
        </button>
      </div>
    </div>
  </div>

  <van-overlay :show="overlayShow" @click="overlayShow = false">
    <div class="wrapper" @click.stop>
      <div class="block">
        <img src="@/assets/img/img_success.png" alt="" />
        <div class="sub-success justify-center">提交成功</div>
        <div class="sub-desc justify-center">
          顾问将于 1-2 个工作日内给您致电
        </div>
        <div
          class="group15 flex-col justify-center align-center"
          @click="goBlack()"
        >
          <span class="word13">我知道了</span>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";
const senceOptions = [
  "信息管理",
  "教育宣传",
  "学工教务",
  "互动平台",
  "网络思政",
];
import { onMounted, onUnmounted, reactive, ref } from "vue";
import router from "../router";
import axios from "../utils/request";
import { Dialog as VantDialog } from "vant";
const state = reactive({
  senceOptions,
  provinceOptions: [],
  userName: "",
  phoneNumber: "",
  schoolName: "",
  provinceId: "",
  cityId: "",
  isPay: false,
  sence: [],
  cityList: [],
  spinning: false,
  email: "",
});

onMounted(() => {
  getProvinceList();
});

const getProvinceList = async () => {
  const res = await axios.post("/region/provinceList");
  console.log(res);
  state.provinceOptions = res.data.map((item: any) => {
    return {
      value: item.id,
      text: item.name,
      isLeaf: false,
      children: [],
    };
  });
};
const getCityList = async (id: number) => {
  const res = await axios.post("/region/cityList", { provinceId: id });
  return res.data;
};
const show = ref(false);
const fieldValue = ref("");
const cascaderValue = ref("");

const onChange = async ({ value }: any) => {
  console.log("onChange", value);

  const cityList = await getCityList(value);
  let index = state.provinceOptions.findIndex(
    (item: any) => item.value === value
  );
  (state.provinceOptions[index] as any).children = cityList.map((item: any) => {
    return {
      value: item.id,
      text: item.name,
      isLeaf: false,
    };
  });
};
const onFinish = ({ selectedOptions }: any) => {
  show.value = false;
  console.log("selectedOptions", selectedOptions);
  state.provinceId = selectedOptions[0].value;
  state.cityId = selectedOptions[1].value;
  fieldValue.value = selectedOptions
    .map((option: any) => option.text)
    .join("/");
};

const senceChecked = ref([]);

const overlayShow = ref(false);
const onSubmit = async () => {
  if (state.spinning) return;
  state.spinning = true;
  if (!state.userName) {
    message("请输入您的姓名");
    state.spinning = false;
    return;
  }
  if (!state.phoneNumber) {
    message("请输入您的手机号");
    state.spinning = false;
    return;
  }
  // mobile phone number check
  if (!state.phoneNumber.match(/^1[3456789]\d{9}$/)) {
    message("请输入正确的手机号");
    state.spinning = false;
    return;
  }

  if (!state.schoolName) {
    message("请输入您的学校名称");
    state.spinning = false;
    return;
  }
  if (!state.provinceId) {
    message("请选择您的学校所在省份-城市");
    state.spinning = false;
    return;
  }

  console.log("checked", senceChecked.value);
  let sence = senceChecked.value;
  console.log("sence", sence);

  let params = {
    schoolName: state.schoolName,
    contactName: state.userName,
    phone: state.phoneNumber,
    provinceId: state.provinceId,
    cityId: state.cityId,
    hasPaid: state.isPay ? "1" : "0",
    useCase: state.sence,
  };
  try {
    await axios.post("/appointment/generate", params);
  } catch (error) {
    state.spinning = false;
    return;
  }

  state.spinning = false;
  overlayShow.value = true;
};
const goBlack = () => {
  router.push("/");
};
const message = (msg: string, fn: Function = () => {}) => {
  VantDialog.alert({
    message: msg,
  }).then(() => {
    fn();
  });
};
</script>
<style lang="less" scoped>
.consult-header {
  height: 88px;
  width: 100%;
  background: #fff;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 9;
  .logo {
    display: flex;
    img {
      width: 48px;
      height: 36px;
      margin: 26px 24px;
    }
    .title {
      line-height: 88px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
    }
  }
  .menu {
    img {
      width: 34px;
      height: 27px;
      margin: 31px 24px;
    }
  }
}
.form-content {
  padding: 24px;
  margin-top: 88px;
  width: 100%;
  .content {
    background-color: #fff;
    .title {
      width: 500px;
      margin-top: 40px;
      margin: auto;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
    }
    .outer2 {
      width: 118px;
      height: 33px;
      margin: 40px 0 0 1px;
      .txt1 {
        width: 13px;
        height: 33px;
        display: block;
        overflow-wrap: break-word;
        color: rgba(255, 53, 70, 1);
        font-size: 24px;
        white-space: nowrap;
        line-height: 33px;
        text-align: center;
      }

      .txt2 {
        width: 96px;
        height: 33px;
        display: block;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 24px;
        white-space: nowrap;
        line-height: 33px;
        text-align: left;
      }
    }
    .outer3 {
      height: 88px;
      border-radius: 8px;
      border: 2px solid rgba(225, 225, 225, 1);
      background-color: rgba(255, 255, 255, 1);
      margin-top: 12px;
      width: 648px;
      margin: 21px 0 10px 19px;
      padding-left: 20px;
    }
    .outer3::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #e1e1e1;
      /* placeholder字体大小  */
      font-size: 32px;
    }
    .outer3[type="text"] {
      font-size: 32px;
    }

    /deep/.van-checkbox-group {
      margin: 24px;
    }
    .group3 {
      height: 88px;
      border-radius: 10px;
      background-color: rgba(66, 134, 247, 1);
      box-shadow: 0px 6px 8px 0px rgba(66, 134, 247, 0.3);
      width: 702px;
      // margin: 30px 0 0 24px;
    }

    .word14 {
      width: 72px;
      height: 50px;
      display: block;
      overflow-wrap: break-word;
      color: rgba(255, 255, 255, 1);
      font-size: 36px;
      white-space: nowrap;
      line-height: 50px;
      text-align: center;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 480px;
  height: 402px;
  border-radius: 10px;
  background-color: #fff;
  img {
    width: 80px;
    height: 80px;
    margin-top: 50px;
  }
  .sub-success {
    height: 45px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 32px;
    white-space: nowrap;
    line-height: 45px;
    text-align: center;
  }
  .sub-desc {
    height: 33px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(102, 102, 102, 1);
    font-size: 24px;
    white-space: nowrap;
    line-height: 33px;
    text-align: center;
    margin: 30px 0 0 13px;
  }
  .group15 {
    width: 392px;
    height: 72px;
    border-radius: 10px;
    background-color: rgba(66, 134, 247, 1);
    margin: auto;
    margin-top: 40px;
  }

  .word13 {
    width: 112px;
    height: 40px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 28px;
    white-space: nowrap;
    line-height: 40px;
    text-align: center;
  }
}
</style>
