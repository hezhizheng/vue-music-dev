<template>
  <div id="musicHeader">


    <mt-header fixed title="@www.hzz.cool" to="//github.com"
               is-link>
      <router-link to="/" slot="left">
        <img class="logo" src="https://i.loli.net/2020/03/09/E2KnBV9ag6cZqdU.png">
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
