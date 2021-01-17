<template>
  <div class="app">
    <div class="nav">
      <router-link to="/canvas">Canvas</router-link> |
      <router-link to="/dom">Dom</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
.app {
}
</style>
