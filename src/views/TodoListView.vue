<template>
  <div class="todo-list" @keyup.esc="hideContentArea">
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
      <div class="content-area column" v-show="isDisplayed">
        <ContentPanel />
      </div>
    </div>
    <div v-show="isShowModal">
      <NotificationModal />
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
import NotificationModal from '@/components/NotificationModal.vue';
import ApmHeader from 'appearamce';

@Component({
  components: {
    TodaysTodoTextarea,
    TodoList,
    TimeList,
    TodaysLearningTextarea,
    ContentPanel,
    NotificationModal,
    ApmHeader,
  },
})
export default class TodoListView extends Vue {

  private hideContentArea(): void {
    this.$store.commit('changeContentAreaStatus', false);
  }

  get isDisplayed(): boolean {
    return this.$store.getters.getIsContentPanelShown;
  }

  get isShowModal(): boolean {
    return this.$store.getters.getIsNotificationModalShown;
  }

}
</script>

<style scoped lang="scss">
.todo-list {
  position: fixed;
  width: 100%;
  height: 100%;
}
.main-area {
  margin-top: 16px;
  height: 95%;
  overflow-y: auto;
  overflow-x: hidden;
}

.columns{
  margin: auto 10%;
  height: 100%;
}

.container{
  max-width: 100%;
}
</style>