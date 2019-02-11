<template>
  <div class="modal is-active" @click="onClickForHide">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="content">
          <h3>Content is old</h3>
          <p>Do you want to delete TimeList contents?</p>
        </div>
      </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="onClickForDelete">Delete Content</button>
      <button class="button" @click="onClickForHide">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodaysTodoTextarea extends Vue {
  @Prop() private msg!: string;

  public onClickForDelete(): void {
    this.$store.dispatch('deleteAllTimeList');
    this.$store.commit('showNotificationModal', false);
  }

  public onClickForHide(): void {
    this.$store.commit('showNotificationModal', false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todays-todo-textarea {
  padding: 8px 0;
  & .subtitle {
    margin-bottom: 8px;
  }
}
</style>
