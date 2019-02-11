<template>
  <div class="todolist">
    <p class="subtitle is-4">Todo List</p>
    <draggable v-model="lists" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div class="list" v-for="element in lists" :key="element.id">
        <CheckButton :item-id="element.id" :status="element.isChecked"/>
        <span class="text"><ContentInput :id="element.id" :value="element.text" @enter="onEnter"/></span> 
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import CheckButton from '@/components/CheckButton.vue';
import ContentInput from '@/components/ContentInput.vue';

@Component({
  components: {
    draggable,
    CheckButton,
    ContentInput,
  },
})
export default class TodoList extends Vue {
  get lists(): any {
    if (this.$store.getters.getTodoLists.length === 0) {
      this.$store.commit('addNewRow');
    }
    return this.$store.getters.getTodoLists;
  }

  public onEnter(event: any): void {
    console.log(event);
    const list = this.$store.getters.getTodoLists;
    const lastItemId = list[list.length - 1].id;

    if (lastItemId === event.id && event.event.target.value !== '') {
      this.$store.commit('addNewRow');
    }
  }

  public mounted(): void {
    this.$store.dispatch('getTodoList');
  }
}

function emptyRow() {
  return {

  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todolist{
  padding: 8px 0;
  & .subtitle{
    margin-bottom: 8px;
  }
}

.list{
  display: flex;
  width: 100%;
  //padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.text{
  flex-basis: 100%;
  text-align: left;
}
</style>
