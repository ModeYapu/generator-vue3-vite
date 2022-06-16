import { ref, inject } from "vue";
import RouterLink from "./RouterLink.vue";
import RouterView from "./RouterView.vue";

const ROUTER_KEY = "__router__";

function createRouter(options: any) {
  return new Router(options);
}

function useRouter() {
  return inject(ROUTER_KEY);
}

function createWebHashHistory() {
  function bindEvents(fn: any) {
    window.addEventListener("hashchange", fn);
  }

  return {
    bindEvents,
    url: window.location.hash.slice(1) || "/",
  };
}

class Router {
  [x: string]: any;
  constructor(options: any) {
    this.history = options.history;
    this.routes = options.routes;
    this.current = ref(this.history.url);

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1);
    });
  }

  install(app: any) {
    app.provide(ROUTER_KEY, this);
    app.component("router-link", RouterLink);
    app.component("router-view", RouterView);
  }
}

export { createRouter, useRouter, createWebHashHistory };
