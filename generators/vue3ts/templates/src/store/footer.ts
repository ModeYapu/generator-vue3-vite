import { defineStore } from "pinia";

export interface IShowFooterStore {
  showFooter: boolean;
}

const useShowFooter = defineStore("showFooter", {
  state: (): IShowFooterStore => {
    return {
      showFooter: false
    };
  },
  getters: {
    getShowFooter(): boolean {
      return this.showFooter;
    }
  },
  actions: {
    setShowFooter(showFooter: boolean) {
      this.showFooter = showFooter;
    }
  }
});

export default useShowFooter;
