<template>
  <div class="todo-list">
    <ApmHeader title="Todo List" color="white"/>
    <div class="columns">
      <div class="main-area column">
        <div class="container">
          <TodaysTodoTextarea />
          <TodoList />
          <TimeList />
          <TodaysLearningTextarea />
        </div>  
      </div>
      <div class="content-area column">
        <ContentPanel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodaysTodoTextarea from '@/components/TodaysTodoTextarea.vue';
import TodoList from '@/components/TodoList.vue';
import TimeList from '@/components/TimeList.vue';
import TodaysLearningTextarea from '@/components/TodaysLearningTextarea.vue';
import ContentPanel from '@/components/ContentPanel.vue';
import ApmHeader from 'appearamce';

@Component({
  components: {
    TodaysTodoTextarea,
    TodoList,
    TimeList,
    TodaysLearningTextarea,
    ContentPanel,
    ApmHeader,
  },
})
export default class TodoListView extends Vue {}
</script>

<style scoped lang="scss">
.todo-list {
}
.main-area {
  margin-top: 16px;
}

.columns{
  margin: auto 10%;
}
</style>