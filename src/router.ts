import Vue from 'vue';
import Router from 'vue-router';
import TodoListView from './views/TodoListView.vue';
import LearningsView from './views/LearningsView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: TodoListView,
    },
    {
      path: '/learnings',
      name: 'learnings',
      component: LearningsView,
    },
  ],
});
