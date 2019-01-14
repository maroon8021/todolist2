import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists : [
      {
        id: 1,
        isChecked: false,
        text: 'hogehoge',
      },
      {
        id: 2,
        isChecked: false,
        text: 'hogehoge',
      },
    ],
    timeRangeList: [
      // {
      //   id: 1,
      //   timeRange: '10:00 ~ 11:00',
      //   content: '',
      // }
    ],
    isContentPanelShown : false,
  },
  mutations: {
    initTimeRangeList: (state, payload) => {
      state.timeRangeList = payload.map((time: any, index: number) => {
        return {
          id: index + 1,
          timeRange: time,
          content: '',
        };
      });
    },
    changeContentAreaStatus: (state, payload) => {
      state.isContentPanelShown = payload;
    },
  },
  actions: {

  },
  getters: { // This is object
    getLists: (state, getters): any => {
      return state.lists;
    },
    getTimeRange: (state, getters): any => {
      return state.timeRangeList;
    },
    getIsContentPanelShown: (state, getters): boolean => {
      return state.isContentPanelShown;
    },
  },
});
