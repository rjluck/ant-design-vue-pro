<template>
  <div id="app">
    <a-button type="primary">Primary</a-button>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less"></style>
