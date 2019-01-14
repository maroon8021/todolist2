<template>
  <div class="todolist">
    <p class="subtitle is-4">Todo List</p>
    <draggable v-model="lists" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div class="list" v-for="element in lists" :key="element.id">
        <CheckButton :item-id="element.id" :status="element.isChecked"/>
        <span class="text"><ContentInput :value="element.text"/></span> 
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
    return this.$store.getters.getLists;
  }
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
