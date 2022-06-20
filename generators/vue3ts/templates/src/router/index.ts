import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
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
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
