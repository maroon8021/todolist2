<template>
  <div class="content-panel" v-show="isDisplayed">
    <p class="subtitle is-4">{{ title }}</p>
    <textarea class="textarea" placeholder="Todays learning"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentPanel extends Vue {
  @Prop() private title!: string;

  get isDisplayed(): boolean {
    return this.$store.getters.getIsContentPanelShown;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
