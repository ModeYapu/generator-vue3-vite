import { createStore } from "./gvuex";

const store = createStore({
  state() {
    return {
      count: 1,
    };
  },
  getters: {
    double(state: any) {
      return state.count * 2;
    },
  },
  mutations: {
    add(state: any) {
      state.count++;
    },
  },
  actions: {
    asyncAdd({ commit }: any) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
});

export default store;
