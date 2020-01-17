<template>
  <div id="musicHeader">
    <mt-header fixed title="@www.hzz.cool" >

      <router-link to="/" slot="left">
        <img class="logo" src="http://m.kugou.com/v3/static/images/index/logo.png">
      </router-link>

      <router-link to="/search" slot="right">
        <mt-button icon="search"></mt-button>
      </router-link>

    </mt-header>

  </div>
</template>

<script type="text/javascript">
</script>

<style>
   .logo {
    width: 7.286rem;
    height: 1.67857rem;
    /*margin-left: .7143rem;*/
  }
</style>
