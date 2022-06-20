import { defineStore } from "pinia";

export interface ICountStore {
  count: number;
}

const store = defineStore("id", {
  state: (): ICountStore => {
    return {
      count: 1
    };
  },
  getters: {
    double(state: any): number {
      return state.count * 2;
    }
  },
  actions: {
    Add({ state }: any) {
      state.count++;
    }
  }
});

export default store;
