<template>
  <div class="home-header" :class="{ isScroll: isScroll }">
    <div class="justify-between">
      <div class="logo">
        <img src="@/assets/img/ysz_logo.png" alt="logo" />
      </div>
      <header-menu />
    </div>
  </div>
  <div class="home-banner">
    <div class="container">
      <div class="row1 row-text justify-center">易校园思政云</div>
      <div class="row2 row-text justify-center">高校网络思政共建生态</div>
      <div class="row3 justify-center">
        微信基础生态 打造高校全新思政内容建设
      </div>
    </div>
  </div>

  <div class="content">
    <div class="mod" v-for="item in data.contentList" :key="item.title">
      <div class="word justify-center">{{ item.title }}</div>
      <div class="txt justify-center">{{ item.desc }}</div>
      <div class="tabs">
        <van-tabs
          v-model:active="item.active"
          color="#4286f7"
          line-width="60px"
        >
          <van-tab :title="it.title" v-for="it in item.list" :key="it.id">
            <div class="tab-content">
              <div class="mod9 flex-row">
                <span class="txt2">{{ it.title }}</span>
                <span class="info4">{{ it.id }}</span>
                <span class="word6">{{ it.desc }}</span>
              </div>
              <div
                class="small-img justify-start"
                :style="{
                  height: it.height / 75 + 'rem',
                  width: it.width / 75 + 'rem',
                }"
              >
                <img :src="getImage(it.smallImg)" alt="" />
              </div>
              <div class="big-img">
                <img :src="getImage(it.bigImg)" alt="" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="user-info">
      <div class="title">他们正在使用思政云</div>
      <div class="desc">越来越多的高校使用思政云开始建设网络思政</div>
      <img src="@/assets/img/img_anli01.png" alt="" />
      <img src="@/assets/img/img_anli02.png" alt="" />
      <img src="@/assets/img/img_anli03.png" alt="" />
    </div>
  </div>
  <van-config-provider :theme-vars="themeVars">
    <div class="home-footer">
      <div class="apply-content">
        <div class="title">基于高校网络思政的创新型管理平台</div>
        <van-button @click="goConsult()" type="primary" size="small"
          >立即申请</van-button
        >
      </div>
      <div class="footer-desc">
        <div class="agreement-policy text">
          <span @click="goPath('https://docs.qq.com/doc/DSE9wQVpaQWR4UHBk')">
            服务协议
          </span>
          <span>|</span>
          <span @click="goPath('https://docs.qq.com/doc/DSFNSSlVoamN2Z3F0')">
            隐私政策
          </span>
        </div>
        <div class="text justify-center">
          版权所有：上海亿思正网科技有限公司
        </div>
      </div>
    </div>
  </van-config-provider>
  <ConsultingService />
</template>
<script setup lang="ts">
import headerMenu from "@/components/menu.vue";
import ConsultingService from "@/components/consulting-service.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import router from "../router";
const name='home'
const wechatAccount = [
  {
    title: "图文群发",
    desc: "指定时间、对象推送图文消息 精准触达",
    smallImg: "img_twqf01.png",
    bigImg: "img_twqf02.png",
    path: "",
    id: "01",
    width: 152,
    height: 84,
    show: true,
  },
  {
    title: "订阅通知",
    desc: "灵活定义推送对象 微信推送通知消息",
    smallImg: "img_dytz01.png",
    bigImg: "img_dytz02.png",
    path: "",
    id: "02",
    width: 164,
    height: 83,
    show: true,
  },
  {
    title: "素材管理",
    desc: "自定义素材库",
    smallImg: "img_scgl01.png",
    bigImg: "img_scgl02.png",
    path: "",
    id: "03",
    width: 116,
    height: 81,
    show: true,
  },
  {
    title: "粉丝管理",
    desc: "自定义粉丝群组 精细化运营",
    smallImg: "img_fsgl01.png",
    bigImg: "img_fsgl02.png",
    path: "",
    id: "04",
    width: 106,
    height: 74,
    show: true,
  },
];
const accountMange = [
  {
    title: "组织架构",
    desc: "多层级组织架构 跨院系管理",
    smallImg: "img_scgl01.png",
    bigImg: "img_scgl02.png",
    path: "",
    id: "01",
    width: 142,
    height: 84,
  },
  {
    title: "校方认证",
    desc: "在校师生实名认证 精准管理",
    smallImg: "img_xfrz01.png",
    bigImg: "img_xfrz02.png",
    path: "",
    id: "02",
    width: 274,
    height: 84,
  },
  {
    title: "归档管理",
    desc: "学生毕业自动归档 省时省心",
    smallImg: "img_gdgl01.png",
    bigImg: "img_gdgl02.png",
    path: "",
    id: "03",
    width: 198,
    height: 84,
  },
];
const contentMange = [
  {
    title: "服务大厅",
    desc: "自定义H5页面 打造专属校园移动门户",
    smallImg: "img_fwdt01.png",
    bigImg: "img_fwdt02.png",
    path: "",
    id: "01",
    width: 152,
    height: 84,
  },
  {
    title: "图文资讯",
    desc: "自定义图文资讯 丰富思政内容建设",
    smallImg: "img_twzx01.png",
    bigImg: "img_twzx02.png",
    path: "",
    id: "02",
    width: 180,
    height: 84,
  },
  {
    title: "视频资讯",
    desc: "自定义视频资讯 一键分发B站、抖音",
    smallImg: "img_spzx01.png",
    bigImg: "img_spzx02.png",
    path: "",
    id: "03",
    width: 180,
    height: 84,
  },
];
const applicationMange = [
  {
    title: "易班应用",
    desc: "集成易班快搭应用",
    smallImg: "img_ybyy01.png",
    bigImg: "img_ybyy02.png",
    path: "",
    id: "01",
    width: 152,
    height: 84,
  },
  {
    title: "第三方应用",
    desc: "自定义三方应用 满足各类校务需求",
    smallImg: "img_dsfyy01.png",
    bigImg: "img_dsfyy02.png",
    path: "",
    id: "02",
    width: 152,
    height: 84,
  },
];
const data = reactive({
  contentList: [
    {
      title: "高校公众号运营",
      desc: "基于微信公众号基础生态 助力思政工作教育的信息一键触达",
      list: wechatAccount,
      active: 0,
    },
    {
      title: "用户高效管理",
      desc: "在校师生公众号轻松认证 毕业自动归档 一键告别冗余数据",
      list: accountMange,
      active: 0,
    },
    {
      title: "多渠道内容分发",
      desc: "图文资讯、视频一键分发至多个新媒体渠道 助力信息传递",
      list: contentMange,
      active: 0,
    },
    {
      title: "多应用接入，助力高校工作",
      desc: "集成易班网、优课、易班快搭、校本化等丰富应用，满足各类校务需求",
      list: applicationMange,
      active: 0,
    },
  ],
});

const getImage = (name: string): string => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};

const themeVars = {
  buttonSmallHeight: "0.6rem",
  buttonPrimaryBorderColor: "#F5F9FF",
  buttonPrimaryBackgroundColor: "#103EE8",
};

const goConsult = () => {
  router.push("/consult");
};
const goPath = (path: string) => {
  if (path) {
    window.open(path);
  }
};
// header
const isScroll = ref(false);

// 保存滚动值，这是兼容的写法
const handleScroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // 判断当前滚动条的高度是否大于等于顶部的高度
  if (scrollTop > 0) {
    isScroll.value = true;
  } else {
    isScroll.value = false;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, true);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, true);
});
</script>
<style lang="less" scoped>
.home-header {
  height: 88px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9;
  .logo {
    img {
      width: 193px;
      height: 36px;
      margin: 26px 24px;
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
.isScroll {
  background-color: #fff;
}
.home-banner {
  width: 100%;
  height: 900px;
  background-image: url("@/assets/img/home_banner.png");
  background-size: cover;
  .container {
    .row1 {
      padding-top: 180px;
    }
    .row-text {
      font-size: 56px;
      font-weight: 500;
      color: #333333;
    }
    .row3 {
      margin-top: 20px;
      font-size: 22px;
      font-weight: 400;
      color: #666666;
    }
  }
}

.content {
  background-color: #fff;
  .mod {
    .word {
      margin-top: 60px;
      font-size: 45px;
      font-weight: 500;
      color: #333333;
    }
    .txt {
      margin-top: 20px;
      font-size: 22px;
      font-weight: 400;
      color: #666666;
    }
    .tabs {
      margin-top: 60px;
      .tab-content {
        .mod9 {
          width: 100%;
          height: 140px;
          margin: 20px 0 0 50px;
          .txt2 {
            height: 56px;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 40px;
            font-family: PingFangSC-Medium;
            white-space: nowrap;
            line-height: 56px;
            text-align: left;
            margin-top: 84px;
            z-index: 2;
          }
          .info4 {
            width: 116px;
            height: 140px;
            display: block;
            overflow-wrap: break-word;
            color: rgba(242, 247, 255, 1);
            font-size: 120px;
            font-family: DINAlternate-Bold;
            white-space: nowrap;
            line-height: 140px;
            text-align: left;
            margin-left: -160px;
          }

          .word6 {
            width: 416px;
            height: 33px;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 24px;
            white-space: nowrap;
            line-height: 33px;
            text-align: left;
            margin: 101px 0 0 54px;
          }
        }
        .small-img {
          height: 84px;
          width: 152px;
          margin: 20px 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .big-img {
          width: 714px;
          height: 510px;
          margin: 0 13px 0 23px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .user-info {
    margin-top: 40px;
    .title {
      height: 63px;
      margin: 20px 0;
      font-size: 45px;
      font-weight: 500;
      color: #333333;
    }
    .desc {
      font-size: 22px;
      font-weight: 400;
      color: #666666;
    }
    img {
      width: 562px;
      height: 168px;
      margin-top: 20px;
    }
  }
}

.home-footer {
  .apply-content {
    width: 100%;
    height: 200px;
    background-image: url("@/assets/img/img_foot_bg.png");
    background-size: cover;
    .title {
      padding-top: 40px;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .footer-desc {
    margin: 60px 0;

    .agreement-policy {
      margin-bottom: 12px;
    }

    .text {
      font-size: 18px;
      font-weight: 400;
      color: #aaaaaa;
    }
  }
}
</style>
