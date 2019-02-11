<template>
  <div class="todays-todo-textarea">
    <p class="subtitle is-4">Todays Todo</p>
    <textarea v-model="todaysTodo" class="textarea" placeholder="Todays todo"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodaysTodoTextarea extends Vue {
  get todaysTodo(): any {
    return this.$store.getters.getTodaysTodo;
  }

  set todaysTodo(value) {
    this.$store.dispatch('updateTodaysTodo', value);
  }

  public mounted(): void {
    this.$store.dispatch('getTodaysTodo');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todays-todo-textarea{
  padding: 8px 0;
  & .subtitle{
    margin-bottom: 8px;
  }

  & .textarea{
    min-height: 250px;
  }
}


</style>
