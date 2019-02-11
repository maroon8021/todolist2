<template>
  <div class="todo-list">
    <ApmHeader title="Todo List" color="white"/>
    <div class="tabs container">
      <ul>
        <li><router-link to="/">TodoList</router-link></li>
        <li class="is-active"><router-link to="/learnings">Learnings</router-link></li>
      </ul>
    </div>
    <div class="container">
      <LearningCard v-for="learning in learnings" :key="learning.id" :title="learning.title" :content="learning.content"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LearningCard from '@/components/LearningCard.vue';
import ApmHeader from 'appearamce';

@Component({
  components: {
    ApmHeader,
    LearningCard,
  },
})
export default class TodoListView extends Vue {
  get learnings(): any {
    return this.$store.getters.getLearnings;
  }

  public mounted(): void {
    this.$store.dispatch('getLearnings');
  }

}
</script>

<style scoped lang="scss">

</style>