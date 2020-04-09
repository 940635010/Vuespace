<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
   data(){
     return {
               
            }
   }
}
</script>

<style lang="less">
#app {
   width: 100%;
  height: 100%;
  color: #2c3e50;
  overflow: hidden;

}
* {
  margin: 0;
  padding: 0;
}
body,html{
    width: 100%;
    height: 100%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
