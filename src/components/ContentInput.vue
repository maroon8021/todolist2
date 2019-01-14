<template>
  <div class="content-input" >
    <input type="text" @focus="onFocus"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentInput extends Vue {
  @Prop() private title!: string;

  public onFocus(event: Event) {
    this.$emit('focus', event);
  }
  get isDisplayed(): boolean {
    return this.$store.getters.getIsContentPanelShown;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-input input{
  width: 99%;
  height: 40px;
  border: 1px solid transparent;
  margin-left: 8px;
}
</style>
