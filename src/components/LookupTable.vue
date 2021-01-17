<template>
  <div class="lookup-table" :style="layerStyle" ref="$container" @mousedown="handleDragStart">
    <div class="header">
      {{this.data.alias}}
    </div>
    <div class="columns">
      <div class="column" v-for="column of data.columns" :key="column.uuid">
        {{column.alias}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as types from '../types';

@Component
export default class LookupTable extends Vue {
  @Prop() private data!: types.LookupTable;

  isDragging = false;

  x = 0;

  y = 0;

  mounted() {
    window.addEventListener('mousemove', this.handleDragMove);
    window.addEventListener('mouseup', this.handleDragEnd);
  }

  destroyed() {
    window.removeEventListener('mousemove', this.handleDragMove);
    window.removeEventListener('mouseup', this.handleDragEnd);
  }

  beforeUpdate() {
    console.time(`Table [${this.data.alias}] updated`);
  }

  updated() {
    console.timeEnd(`Table [${this.data.alias}] updated`);
  }

  get layerStyle() {
    return {
      transform: `translate(${this.x}px, ${this.y}px)`,
      left: '0px',
      top: '0px',
      width: `${this.data.width}px`,
      height: `${this.data.height}px`,
    };
  }

  @Watch('data.x', { immediate: true })
  onDataXChanged(newVal: number, oldVal: number) {
    if (newVal !== oldVal) {
      this.x = newVal;
    }
  }

  @Watch('data.y', { immediate: true })
  onDataYChanged(newVal: number, oldVal: number) {
    if (newVal !== oldVal) {
      this.y = newVal;
    }
  }

  handleDragStart(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.isDragging = true;
  }

  handleDragMove(event: MouseEvent) {
    if (this.isDragging) {
      event.stopPropagation();
      event.preventDefault();
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
.lookup-table {
  position: absolute;
  display: flex;
  flex-direction: column;
  .header {
    color: #FFFFFF;
    background-color: #0A88DE;
    height: 30px;
  }
  .columns {
    flex: 1;
    overflow: auto;
  }
}
</style>
