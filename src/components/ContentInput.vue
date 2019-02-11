<template>
  <div class="content-input" >
    <input type="text" @focus="onFocus" @blur="onBlur" @keypress.enter="onEnter" @input="onInput" v-model="getValue"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentInput extends Vue {
  @Prop() private value!: string;
  @Prop() private id!: string;

  public onFocus(event: Event) {
    this.$emit('focus', {
      event,
      id : this.id,
    });
  }

  public onEnter(event: Event): void {
    this.$emit('enter', {
      event,
      id : this.id,
    });
  }

  public onBlur(event: Event): void {
    this.$emit('blur', {
      event,
      id : this.id,
    });
  }

  public onInput(event: Event): void {
    this.$emit('input', {
      event,
      id : this.id,
    });
  }

  get getValue(): string {
    return this.value;
  }

  set getValue(value) {
    // this.$store.commit('updateContentPanelTitle', value);
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
  font-size: 17px;
}
</style>
