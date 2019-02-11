import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {todoListUrl, resorce} from './service/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoLists : [],
    timeRangeList: [
      // {
      //   id: 1,
      //   timeRange: '10:00 ~ 11:00',
      //   title: '',
      //   content: '',
      // }
    ],
    todaysTodo : {
      content : '',
      date : '',
    },
    contentPanel : {
      isShown : false,
      targetId : 0,
    },
    todaysLearning : {
      title: '',
      content: '',
      isSending: false,
    },
    notificationModal : {
      isShown : false,
    },
    /**
     * on Learnings Page
     */
    learnings : [],

  },
  mutations: {
    addNewRow: (state, payload) => {
      const newTodoList: any = state.todoLists;
      newTodoList.push({
        id : state.todoLists.length === 0 ? 1 : state.todoLists.length + 1,
        isChecked : false,
        text : '',
      });
      state.todoLists = newTodoList;
    },
    initTimeRangeList: (state, payload) => {
      state.timeRangeList = payload.map((time: any, index: number) => {
        return {
          id: index + 1,
          timeRange: time,
          title: '',
          content: '',
        };
      });
    },
    changeContentAreaStatus: (state, payload) => {
      state.contentPanel.isShown = payload;
    },
    updateTodaysTodo: (state, payload) => {
      state.todaysTodo = payload;
    },
    updateTodoList: (state, payload) => {
      state.todoLists = payload;
    },
    updateTimeList: (state, payload) => {
      console.log('updateTimeList');
      const oldList: any = state.timeRangeList;
      state.timeRangeList = oldList.map((item: any) => {
        const target: any = payload.find((list: any) => {
          // will be fixed
          return list.id === item.id;
        });
        return Object.assign(item, target);
      });
    },
    updateTimeListTitle: (state, payload) => {
      state.contentPanel.targetId = payload.id;
      const newList: any = state.timeRangeList.map((item: any) => {
        if (item.id === payload.id) {
          item.title = payload.title;
        }
        return item;
      });
      state.timeRangeList = newList;
    },
    updateTimeListContent: (state, payload) => {
      const newList: any = state.timeRangeList.map((item: any) => {
        if (item.id === state.contentPanel.targetId) {
          item.content = payload;
        }
        return item;
      });
      state.timeRangeList = newList;
    },
    updateTargetTimeList: (state, payload) => {
      state.contentPanel.targetId = payload;
    },
    updateLearningTitle: (state, payload) => {
      state.todaysLearning.title = payload;
    },
    updateLearningContent: (state, payload) => {
      state.todaysLearning.content = payload;
    },
    updateLearningSendStatus: (state, payload) => {
      state.todaysLearning.isSending = payload;
    },
    updateLearnings: (state, payload) => {
      state.learnings = payload;
    },
    showNotificationModal: (state, payload) => {
      state.notificationModal.isShown = payload;
    },
  },
  actions: {
    deleteAllTimeList(context) {
      const params = {
        action : 'deleteAllTimeRangeList',
      };
      axios.post(todoListUrl + resorce.timeList, params).then((response) => {
        console.log(response);
        const newList = [];
        for (let i = 0; i < context.state.timeRangeList.length; i++) {
          newList.push({
            id : i + 1,
            title : '',
            content : '',
          });
        }
        context.commit('updateTimeList', newList);
      });
    },
    getTodaysTodo(context) {
      axios.get(todoListUrl + resorce.todaysTodo).then((response) => {
        console.log(response);
        context.commit('updateTodaysTodo', response.data);
      });
    },
    getTodoList(context) {
      axios.get(todoListUrl + resorce.todoList).then((response) => {
        console.log(response);
        context.commit('updateTodoList', response.data);
      });
    },
    getTimeRangeList(context) {
      axios.get(todoListUrl + resorce.timeList).then((response) => {
        console.log(response);
        context.commit('updateTimeList', response.data);
        const hasOldData = context.getters.hasOldData;
        context.commit('showNotificationModal', hasOldData);
      });
    },
    getLearnings(context) {
      if (context.state.learnings.length > 0) {
        return;
      }
      axios.get(todoListUrl + resorce.todaysLearning).then((response) => {
        console.log(response);
        context.commit('updateLearnings', response.data);
      });
    },

    updateTodaysTodo(context, value) {
      axios.post(todoListUrl + resorce.todaysTodo, {value}).then((response) => {
        console.log(response);
      });
    },

    // updateTimeList(context, payload){
    //   axios.post(todoListUrl + resorce.timeList, payload).then(response => {
    //     console.log(response);
    //   });
    // },

    updateTimeListTitle(context) {
      const params = {
        id : context.state.contentPanel.targetId,
        title : context.getters.getContentPanelTitle,
        action : 'updateTimeListTitle',
      };
      axios.post(todoListUrl + resorce.timeList, params).then((response) => {
        console.log(response);
      });
    },

    updateTimeListContent(context) {
      const params = {
        id : context.state.contentPanel.targetId,
        content : context.getters.getContentPanelContent,
        action : 'updateTimeListContent',
      };
      axios.post(todoListUrl + resorce.timeList, params).then((response) => {
        console.log(response);
      });
    },

    updateTodaysLearning(context) {
      const todaysLearning = context.state.todaysLearning;
      const isTitleEmpty: boolean = todaysLearning.title == null || todaysLearning.title === '';
      const isContentEmpty: boolean = todaysLearning.content == null || todaysLearning.content === '';
      if (isTitleEmpty || isContentEmpty) {
        return;
      }
      context.commit('updateLearningSendStatus', true);
      const params = {
        title : context.state.todaysLearning.title,
        content : context.state.todaysLearning.content,
      };
      axios.post(todoListUrl + resorce.todaysLearning, params).then((response) => {
        console.log(response);
        context.commit('updateLearningTitle', '');
        context.commit('updateLearningContent', '');
        context.commit('updateLearningSendStatus', false);
      });
    },

  },
  getters: { // This is object
    getTodoLists: (state, getters): any => {
      return state.todoLists;
    },
    getTimeRange: (state, getters): any => {
      return state.timeRangeList;
    },
    getTodaysTodo: (state, getters): any => {
      return state.todaysTodo.content;
    },
    getIsContentPanelShown: (state, getters): boolean => {
      return state.contentPanel.isShown;
    },
    getIsNotificationModalShown: (state, getters): boolean => {
      return state.notificationModal.isShown;
    },
    getContentPanelTitle: (state, getters): string => {
      const targetItem: any = state.timeRangeList[state.contentPanel.targetId - 1];
      return targetItem ? targetItem.title : '';
    },
    getContentPanelContent: (state, getters): string => {
      const targetItem: any = state.timeRangeList[state.contentPanel.targetId - 1];
      return targetItem ? targetItem.content : '';
    },
    getLearningTitle: (state, getters): any => {
      return state.todaysLearning.title;
    },
    getLearningContent: (state, getters): any => {
      return state.todaysLearning.content;
    },
    getLearningSendStatus: (state, getters): any => {
      return state.todaysLearning.isSending;
    },
    /**
     * on Learnings Page
     */
    getLearnings: (state, getters): any => {
      return state.learnings;
    },
    hasOldData: (state, getters): boolean => {
      const today = new Date();
      const y = today.getFullYear();
      const m = ('00' + (today.getMonth() + 1)).slice(-2);
      const d = ('00' + today.getDate()).slice(-2);
      const todayDate = y + '-' + m + '-' + d;
      return state.timeRangeList.some((item: any) => {
        const registerDate = new Date(item.date);
        return item.date !== todayDate;
      });
    },
  },
});
