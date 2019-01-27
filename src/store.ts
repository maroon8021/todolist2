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
      //   content: '',
      // }
    ],
    isContentPanelShown : false,
    todaysTodo : {
      content : '',
      date : ''
    },

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
          content: '',
        };
      });
    },
    changeContentAreaStatus: (state, payload) => {
      state.isContentPanelShown = payload;
    },
    updateTodaysTodo: (state, payload) => {
      state.todaysTodo = payload;
    },
    updateTodoList: (state, payload) => {
      state.todoLists = payload;
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

    updateTodaysTodo(context, value){
      axios.post(todoListUrl + resorce.todaysTodo, {value}).then(response => {
        console.log(response);
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
      return state.isContentPanelShown;
    },
  },
});
