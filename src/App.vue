<template>
  <div
    id="app"
    class="brown"
  >
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, MicrosoftYaHei-Bold,
    MicrosoftYaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555555;
}
html,
body {
  height: 100vh;
}
.brown {
  // filter:progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
  // -webkit-filter: grayscale(80%);
}
div {
  box-sizing: border-box;
}
</style>
