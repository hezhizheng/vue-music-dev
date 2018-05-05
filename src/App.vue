<template>
  <div id="app">
    <musicHeader></musicHeader>
    <!--<mt-header fixed title="固定在顶部"></mt-header>-->
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <!--<router-view class="view"></router-view>-->
    <!--<div class="page-header-main">-->
      <!--asdasdsadk-->
    <!--</div>-->

  </div>
</template>

<script>
  import musicHeader from './components/Header.vue';
  // import musicSearch from './components/Search.vue';


  export default {
    name: 'App',
    components: {
      musicHeader,
      // musicSearch
    }
  }
</script>

<style>
  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  /*}*/

</style>
