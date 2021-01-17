<template>
  <v-group :config="layerStyle">
    <v-rect :config="containerStyle" />
    <v-rect :config="headerStyle" />
    <v-text :config="tableNameStyle" />
    <v-text :config="iconDeleteStyle" />
    <TableColumn v-for="column of data.columns" :key="column.uuid" :data="column" :table="data" />
  </v-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Konva from 'konva';
import * as types from '../types';
import TableColumn from './TableColumn.vue';

@Component({
  components: {
    TableColumn,
  },
})
export default class LookupTable extends Vue {
  @Prop() private data!: types.LookupTable;

  iconDeleteStyle: Konva.TextConfig = {
    fontFamily: 'superset-kylin',
    fill: '#FFFFFF',
    text: '\ue930',
  };

  get layerStyle(): Konva.LayerConfig {
    return {
      x: this.data.x,
      y: this.data.y,
      width: this.data.width,
      height: this.data.height,
      draggable: true,
    };
  }

  get headerStyle(): Konva.RectConfig {
    return {
      x: 0,
      y: 0,
      width: this.data.width,
      height: 30,
      fill: '#0A88DE',
    };
  }

  get tableNameStyle(): Konva.TextConfig {
    return {
      text: this.data.alias,
      fill: '#FFFFFF',
    };
  }

  get containerStyle(): Konva.RectConfig {
    return {
      width: this.data.width,
      height: this.data.height,
      stroke: 'black',
      strokeWidth: 1,
    };
  }
}
</script>

<style lang="less">
</style>
