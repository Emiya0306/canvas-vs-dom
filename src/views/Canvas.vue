<template>
  <div class="canvas">
    <div>
      <button @click="fetchLookupTables">
        Fetch Canvas Lookup Tables
      </button>
    </div>
    <v-stage :config="stageConfig">
      <v-layer>
        <LookupTable
          v-for="lookupTable of lookupTables"
          :key="lookupTable.uuid"
          :data="lookupTable"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Konva from 'konva';

import LookupTable from '../canvasComponents/LookupTable.vue';
import * as types from '../types';

@Component({
  components: {
    LookupTable,
  },
})
export default class Canvas extends Vue {
  stageConfig: Konva.ContainerConfig = {
    width: 1000,
    height: 500,
    draggable: true,
  };

  lookupTables: Array<types.LookupTable> = [];

  updated() {
    console.timeEnd('canvas updated');
  }

  fetchLookupTables() {
    console.time('canvas updated');

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
}
</script>

<style lang="less">
.canvas {
  .konvajs-content {
    border: 1px solid;
  }
}
</style>
