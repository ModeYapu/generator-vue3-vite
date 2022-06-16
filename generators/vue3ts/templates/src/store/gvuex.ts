import { computed, inject, reactive } from "vue";

const STORE_KEY = "__store__";

function useStore() {
  return inject(STORE_KEY);
}

function createStore(options: any) {
  return new Store(options);
}

class Store {
  // [x: string]: {};
  private _state: { data: any };
  private _mutations: any;
  getters: { [key: string]: any };
  private _actions: any;

  constructor(options: any) {
    // this.$options = options;
    this._state = reactive({
      data: options.state(),
    });
    this._mutations = options.mutations;
    this._actions = options.actions;
    this.getters = {};

    Object.keys(options.getters).forEach((name: string) => {
      let fn = options.getters[name];
      this.getters[name] = computed(() => fn(this.state));
    });
  }

  get state() {
    return this._state.data;
  }

  commit = (type: string, payload: any) => {
    const entry = this._mutations[type];
    entry && entry(this.state, payload);
  };

  dispatch = (type: string, payload: any) => {
    const entry = this._actions[type];
    entry && entry(this, payload);
  };

  install(app: any) {
    app.provide(STORE_KEY, this);
  }
}

export { createStore, useStore };
