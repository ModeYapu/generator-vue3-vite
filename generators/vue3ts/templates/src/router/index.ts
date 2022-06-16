// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHashHistory } from "./grouter";
import Home from "@/views/home.vue";
import Consult from '@/views/consult.vue'
import PageLoad from "./PageLoad.vue";
const routes = [
  {
    path: "/:page/:page1/:page2/:page3/:page4/:page5",
    component: PageLoad,
  },
  {
    path: "/:page/:page1/:page2/:page3/:page4",
    component: PageLoad,
  },
  {
    path: "/:page/:page1/:page2/:page3",
    component: PageLoad,
  },
  {
    path: "/:page/:page1/:page2",
    component: PageLoad,
  },
  {
    path: "/:page/:page1",
    component: PageLoad,
  },
  {
    path: "/:page",
    component: PageLoad,
  },
  {
    path: "/consult",
    component: Consult,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
