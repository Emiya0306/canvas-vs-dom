<template>
  <div
    class="dom"
    @mousedown="handleDragStart"
  >
    <div>
      <button @click="fetchLookupTables">
        Fetch Dom Lookup Table
      </button>
    </div>
    <div class="container" ref="$container">
      <div class="layer" :style="layerStyle">
        <LookupTable
          v-for="lookupTable of lookupTables"
          :key="lookupTable.uuid"
          :data="lookupTable"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LookupTable from '../components/LookupTable.vue';
import * as types from '../types';

@Component({
  components: {
    LookupTable,
  },
})
export default class Canvas extends Vue {
  lookupTables: Array<types.LookupTable> = [];

  isDragging = false;

  x = 0;

  y = 0;

  get layerStyle() {
    return {
      transform: `translate(${this.x}px, ${this.y}px)`,
    };
  }

  mounted() {
    window.addEventListener('mousemove', this.handleDragMove);
    window.addEventListener('mouseup', this.handleDragEnd);
  }

  destroyed() {
    window.removeEventListener('mousemove', this.handleDragMove);
    window.removeEventListener('mouseup', this.handleDragEnd);
  }

  updated() {
    console.timeEnd('dom updated');
  }

  fetchLookupTables() {
    console.time('dom updated');

    const lookupTables: Array<types.LookupTable> = [];

    let currentX = 2;
    let currentY = 2;

    for (let i = 0; i < 30; i += 1) {
      const columns: Array<types.Column> = [];
      for (let j = 0; j < 700; j += 1) {
        columns.push({
          uuid: j,
          idx: j,
          name: `Column_${j}`,
          alias: `Column_${j}`,
          dataType: 'int',
        });
      }

      lookupTables.push({
        uuid: i,
        idx: i,
        name: `Table_${i}`,
        alias: `Table_${i}`,
        columns,
        x: currentX,
        y: currentY,
        width: 150,
        height: 200,
      });

      if (currentX + 155 < 1000) {
        currentX += 155;
      } else {
        currentX = 2;
        currentY += 205;
      }
    }
    this.lookupTables = lookupTables;
  }

  handleDragStart() {
    this.isDragging = true;
  }

  handleDragMove(event: MouseEvent) {
    if (this.isDragging) {
      this.x += event.movementX;
      this.y += event.movementY;
    }
  }

  handleDragEnd() {
    this.isDragging = false;
  }
}
</script>

<style lang="less">
.dom {
  .container {
    border: 1px solid;
    width: 1000px;
    height: 500px;
    position: relative;
    overflow: hidden;
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
