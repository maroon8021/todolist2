<template>
  <div class="todays-learning-textarea">
    <p class="subtitle is-4">Todays Learning</p>
    <input class="input" type="text" placeholder="Title">
    <textarea class="textarea" placeholder="Todays learning"></textarea>
    <button class="button is-info">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodaysLearningTextarea extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todays-learning-textarea{
  padding: 8px 0;
  & .subtitle{
    margin-bottom: 8px;
  }
}
</style>
