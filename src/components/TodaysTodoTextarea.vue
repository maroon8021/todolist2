<template>
  <div class="todays-todo-textarea">
    <p class="subtitle is-4">Todays Todo</p>
    <textarea class="textarea" placeholder="Todays todo"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodaysTodoTextarea extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todays-todo-textarea{
  padding: 8px 0;
  & .subtitle{
    margin-bottom: 8px;
  }
}
</style>
