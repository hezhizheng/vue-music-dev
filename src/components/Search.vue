<template>
  <div id="musicSearch">

    <div class="page-music-search">

      <mt-header title="搜索" class="return-header">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>


      <mt-field label="" placeholder="歌手/歌名/拼音" v-model="keywords" @keyup.enter.native="handleSearch(keywords)">
        <mt-button type="primary" @click.native="handleSearch(keywords)">搜索</mt-button>
      </mt-field>

      <div v-bind:class="[musicList]"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="false"
           infinite-scroll-distance="10">

        <span class="search-result-hd">{{ total }}</span>

        <mt-cell
          :title="item.SongName"
          :label="item.SingerName"
          v-for="item in list"
          :value="item">
          <!--<span>{{ item }}</span>&nbsp;&nbsp;-->
          <span>试听</span>&nbsp;&nbsp;
          <span>下载</span>
        </mt-cell>

      </div>

    </div>


  </div>
</template>

<script type="text/javascript">
  import APILIST from '../../src/API_LIST.js';
  import {Indicator} from 'mint-ui';

  export default {

    data() {
      return {
        result: [
          {title: 'Runoob', value: 1},
          {title: 'Google', value: 2},
          {title: 'Taobao', value: 3}
        ],
        keywords: '', // 一定得初始化？？？
        list: [],
        musicList: 'music-list',
        total: '',
        total_count: 0,
        pageSize: '10',
        page: 1,
      }
    },

    methods: {
      handleSearch: function (keywords) {
        console.log(keywords);
        this.musicList = '';
        // Lambda写法
        this.$http.get(APILIST.SEARCH_SONG, {
          params: {keyword: keywords},
          before: function () {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
          }
        }).then((response) => {
          this.total = '共有' + response.data.data.total + '条结果';
          this.total_count = response.data.data.total;
          this.list = response.data.data.lists;
          this.pageSize = response.data.data.pagesize;
          this.page = response.data.data.page;
          Indicator.close();
          // alert(response.data.data.total);
          // 响应成功回调
        }, (response) => {
          // 响应错误回调
        });

      },

      loadMore() {
        this.loading = true;
        if (this.keywords == '' || this.list.length == 0) {
          setTimeout(() => {
            this.page = 1;
            this.list = [];
            this.loading = false;
          }, 1000);
        } else {
          setTimeout(() => {
            const totalPage = (this.total_count + this.pageSize - 1) / this.pageSize;
            // console.log(this.total_count);
            // console.log(this.pageSize);
            // console.log(totalPage);
            const i = this.page + 1;

            this.$http.get(APILIST.SEARCH_SONG, {
              params: {keyword: this.keywords, page: i},
              before: function (request) {
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                });
              }
            }).then((response) => {

              this.list = this.list.concat(response.data.data.lists);
              this.page = this.page + 1;
              Indicator.close();

            }, (response) => {
              // 响应错误回调
            });
            this.loading = false;
          }, 1000);
        }

      },

    }

  }


</script>

<style>
  #musicSearch {
    /*top: 0;*/
    right: 0;
    left: 0;
    position: absolute;
  }

  .page-music-search {
    margin-top: 50px;
    min-height: 120vh;
  }

  .return-header {
    background-color: #424242;
    /*margin-left: -15px;*/
    /*margin-right: -15px;*/
  }

  .music-list {
    visibility: hidden;
  }

  .search-result-hd {
    height: 500px;
    /*line-height: 1.5714rem;*/
    background: #e6e6e6;
    /*padding-left: .9rem;*/
    /*font-size: .7857rem;*/
    /*color: #5d5d5d;*/
    width: 100%;
  }
</style>
