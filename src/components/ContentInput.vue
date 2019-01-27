<template>
  <div class="content-input" >
    <input type="text" @focus="onFocus" @keypress.enter="onEnter" v-model="value"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentInput extends Vue {
  @Prop() private value!: string;
  @Prop() private id!: string;

  public onFocus(event: Event) {
    this.$emit('focus', event);
  }

  onEnter(event: Event): void{
    this.$emit('enter', {
      event,
      id : this.id,
    });
  }

  get isDisplayed(): boolean {
    return this.$store.getters.getIsContentPanelShown;
  }

  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-input input{
  width: 98%;
  height: 40px;
  border: 1px solid transparent;
  margin-left: 8px;
}
</style>
