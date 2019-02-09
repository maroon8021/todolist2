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
      <button class="button is-success">Delete Content</button>
      <button class="button" @click="onClickForHide">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TodaysTodoTextarea extends Vue {
  @Prop() private msg!: string;

  onClickForHide() :void{
    this.$store.commit('showNotificationModal', false);
  }
  // get (): any {
  //   return this.$store.getters.getTodaysTodo;
  // }

  // set todaysTodo(value) {
  //   this.$store.dispatch("updateTodaysTodo", value);
  // }

  mounted(): void {
    //this.$store.dispatch("getTodaysTodo");
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
