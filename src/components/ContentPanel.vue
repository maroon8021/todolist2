<template>
  <div class="content-panel">
    <p class="subtitle is-4">{{ title }}</p>
    <textarea class="textarea" placeholder="Todays learning"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentPanel extends Vue {
  @Prop() private title!: string;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.subtitle{
  margin-top: 24px;
  margin-bottom: 8px;
}

.textarea{
  height: 300px;
}
</style>
