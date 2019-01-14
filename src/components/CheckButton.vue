<template>
  <button class="button is-rounded check-button" :class="isSuccess" @click="onClick">
    <span class="icon is-small">
      <i class="fas fa-check"></i>
    </span>
  </button>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CheckButton extends Vue {
  @Prop() private itemId!: number;
  @Prop() private status!: boolean;

  get isSuccess(): string {
    return this.status ? 'has-text-success' : 'has-text-grey-dark';
  }

  public onClick(event: Event): void {
    event.preventDefault();
    this.$store.dispatch('deleteItem', this.itemId);
  }

}
</script>

<style scoped lang="scss">
.check-button{
  padding: 0 1%;
  margin-top: 2px;
  margin-left: 4px;
}

</style>
