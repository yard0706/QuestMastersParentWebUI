import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});

export const useQuestStore = defineStore("quest", {
  state: () => {
    return { familyId: 0, tavernId: 0, questId: 0 };
  },
});
