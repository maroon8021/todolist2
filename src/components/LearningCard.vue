<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{title}}</p>
    </header>
    <div class="card-content">
      <div class="control">
        <div v-html="content"></div>
        <!--
        <textarea class="textarea" v-model="content" disabled></textarea>
        -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodoList extends Vue {
  @Prop() private title!: string;
  @Prop() private content!: string;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card{
  margin-bottom: 16px;
}
</style>
