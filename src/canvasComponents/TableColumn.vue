<template>
  <v-group :config="containerStyle">
    <v-rect :config="backgroundStyle" />
    <v-text :config="textStyle" />
  </v-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Konva from 'konva';
import * as types from '../types';

@Component
export default class TableColumn extends Vue {
  @Prop() private table!: types.LookupTable;

  @Prop() private data!: types.Column;

  get containerStyle(): Konva.LayerConfig {
    return {
      x: 0,
      y: (this.data.idx + 1) * 30,
    };
  }

  get backgroundStyle(): Konva.RectConfig {
    return {
      x: 0,
      y: 0,
      width: this.table.width,
      height: 30,
      stroke: 'black',
      strokeWidth: 1,
    };
  }

  get textStyle(): Konva.TextConfig {
    return {
      text: this.data.alias,
      fill: 'black',
    };
  }
}
</script>

<style lang="less">
</style>
