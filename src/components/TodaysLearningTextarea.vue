<template>
  <div class="todays-learning-textarea">
    <p class="subtitle is-4">Todays Learning</p>
    <input class="input margin-bottom-8" type="text" placeholder="Title" v-model="learningTitle">
    <div class="margin-bottom-8">
      <ckeditor :editor="editor" v-model="learningContent" ></ckeditor>
    </div>
    <button class="button is-info" @click="onClick" :disabled="sendStatus">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class TodaysLearningTextarea extends Vue {

  get learningTitle(): string {
    return this.$store.getters.getLearningTitle;
  }
  get learningContent(): string {
    return this.$store.getters.getLearningContent;
  }
  get sendStatus(): boolean {
    return this.$store.getters.getLearningSendStatus;
  }
  set learningTitle(value) {
    this.$store.commit('updateLearningTitle', value);
  }
  set learningContent(value) {
    this.$store.commit('updateLearningContent', value);
  }

  public editor: any = ClassicEditor;

  public onClick(): void {
    this.$store.dispatch('updateTodaysLearning');
  }
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

.margin-bottom-8{
  margin-bottom: 8px;
}
</style>
