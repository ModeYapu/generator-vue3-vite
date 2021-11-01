import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
