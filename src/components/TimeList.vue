<template>
  <div class="timelist">
    <p class="subtitle is-4">Time List</p>
    <table class="table" width="100%">
      <thead>
        <tr>
          <th>Time Range</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in timeRange"  :key="item.id">
          <th class="time-range-text">
            <span class="tag is-light is-medium time-range-left-item">
              {{ item.timeRange }}
            </span>
          </th>
          <td class="content-input"><ContentInput @focus="onFocusContentInput" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ContentInput from '@/components/ContentInput.vue';

@Component({
  components: {
    ContentInput,
  },
})
export default class TimeList extends Vue {
  public onFocusContentInput(event: Event) {
    this.$store.commit('changeContentAreaStatus', true);
  }
  get timeRange(): any {
    return this.$store.getters.getTimeRange;
  }
  public beforeCreate(): void {
    this.$store.commit('initTimeRangeList', timeRange);
  }
}

const timeRange = [
  '10:00 ~ 11:00',
  '11:00 ~ 12:00',
  '12:00 ~ 13:00',
  '13:00 ~ 14:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
  '17:00 ~ 18:00',
  '18:00 ~ 19:00',
  '19:00 ~ 20:00',
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timelist{
  padding: 8px 0;
  & .subtitle{
    margin-bottom: 0px;
  }
}

.time-range-text{
  width: 1px;
  white-space: nowrap;
  padding: 4px 12px;
}

.list{
  display: flex;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.text{
  flex-basis: 100%;
  text-align: left;
}

.content-input{
  padding: 1px 0;
}
</style>
