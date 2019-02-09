import { register } from 'register-service-worker';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import {todoListUrl, resorce} from './service/index'

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
      date : ''
    },
    contentPanel : {
      isShown : false,
      targetId : 0
    },
    todaysLearning : {
      title: '',
      content: '',
      isSending: false
    },
    notificationModal : {
      isShown : false
    }

  },
  mutations: {
    addNewRow: (state, payload) => {
      let newTodoList:any = state.todoLists;
      newTodoList.push({
        id : state.todoLists.length === 0 ? 1 : state.todoLists.length + 1,
        isChecked : false,
        text : ''
      })
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
      console.log('updateTimeList')
      let oldList:any = state.timeRangeList;
      state.timeRangeList = oldList.map((item: any)=>{
        let target:any = payload.find((list: any) => {
          // will be fixed
          return list.id === item.id
        });
        return Object.assign(item, target);
      });
    },
    updateTimeListTitle: (state, payload) => {
      state.contentPanel.targetId = payload.id;
      let newList:any = state.timeRangeList.map((item:any) => {
        if(item.id === payload.id){
          item.title = payload.title
        }
        return item;
      });
      state.timeRangeList = newList;
    },
    updateTimeListContent: (state, payload) => {
      let newList:any = state.timeRangeList.map((item:any) => {
        if(item.id === state.contentPanel.targetId){
          item.content = payload
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
    showNotificationModal: (state, payload) => {
      state.notificationModal.isShown = payload;
    },
  },
  actions: {
    getTodaysTodo(context){
      axios.get(todoListUrl + resorce.todaysTodo).then(response => {
        console.log(response);
        context.commit('updateTodaysTodo', response.data);
      });
    },
    getTodoList(context){
      axios.get(todoListUrl + resorce.todoList).then(response => {
        console.log(response);
        context.commit('updateTodoList', response.data);
      });
    },
    getTimeRangeList(context){
      axios.get(todoListUrl + resorce.timeList).then(response => {
        console.log(response);
        context.commit('updateTimeList', response.data);
        let hasOldData = context.getters.hasOldData;
        context.commit('showNotificationModal', hasOldData);
      });
    },

    updateTodaysTodo(context, value){
      axios.post(todoListUrl + resorce.todaysTodo, {value}).then(response => {
        console.log(response);
      });
    },

    // updateTimeList(context, payload){
    //   axios.post(todoListUrl + resorce.timeList, payload).then(response => {
    //     console.log(response);
    //   });
    // },

    updateTimeListTitle(context){
      let params = {
        id : context.state.contentPanel.targetId,
        title : context.getters.getContentPanelTitle,
        action : 'updateTimeListTitle'
      }
      axios.post(todoListUrl + resorce.timeList, params).then(response => {
        console.log(response);
      });
    },

    updateTimeListContent(context){
      let params = {
        id : context.state.contentPanel.targetId,
        content : context.getters.getContentPanelContent,
        action : 'updateTimeListContent'
      }
      axios.post(todoListUrl + resorce.timeList, params).then(response => {
        console.log(response);
      });
    },

    updateTodaysLearning(context){
      let todaysLearning = context.state.todaysLearning;
      let isTitleEmpty:boolean = todaysLearning.title == null || todaysLearning.title === '';
      let isContentEmpty:boolean = todaysLearning.content == null || todaysLearning.content === '';
      if(isTitleEmpty || isContentEmpty){
        return;
      }
      context.commit('updateLearningSendStatus', true);
      let params = {
        title : context.state.todaysLearning.title,
        content : context.state.todaysLearning.content,
      }
      axios.post(todoListUrl + resorce.todaysLearning, params).then(response => {
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
      let targetItem:any = state.timeRangeList[state.contentPanel.targetId - 1];
      return targetItem ? targetItem.title : '';
    },
    getContentPanelContent: (state, getters): string => {
      let targetItem:any = state.timeRangeList[state.contentPanel.targetId - 1];
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
    hasOldData: (state, getters): boolean => {
      let today = new Date();
      return state.timeRangeList.some((item: any)=>{
        let registerDate = new Date(item.date);
        return today.getTime() != registerDate.getTime();
      });
    },
  },
});
