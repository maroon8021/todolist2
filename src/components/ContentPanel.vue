<template>
  <div class="content-panel">
    <p class="subtitle is-4">{{ title }}</p>
    <textarea class="textarea" placeholder="Todays learning" v-model="content" @keyup.left="onKeyup" @keyup.esc="onBlur" @blur="onBlur"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentPanel extends Vue {

  onKeyup(event: KeyboardEvent){
    if(event.altKey){
      // Will be implemented
    }
  }

  onBlur(event: any){
    this.$store.dispatch('updateTimeListContent');
  }

  get title(): any {
    return this.$store.getters.getContentPanelTitle;
  }

  get content():any {
    return this.$store.getters.getContentPanelContent;
  }

  set content(value) {
    this.$store.commit('updateTimeListContent', value);
  }

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
