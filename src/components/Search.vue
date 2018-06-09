<template>
  <div id="musicSearch">

    <div class="page-music-search1">

      <mt-header title="搜索" class="return-header">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>

      <mt-field label="" placeholder="歌手/歌名/拼音" v-model="keywords" @keyup.enter.native="handleSearch(keywords)">
        <!--<button type="button"  @click.native="handleSearch(keywords)">搜索</button>-->
        <mt-button style="background-color:rgba(0,0,0,0); box-shadow:none;" type="default" icon="search"
                   @click.native="handleSearch(keywords)">搜索
        </mt-button>
      </mt-field>

    </div>


    <!--<Play></Play>-->

    <!--<component :is="cut"></component>-->
    <!--<component v-bind:is="componentId"></component>-->


    <div v-bind:class="[musicPlay]" id="vue-play">

      <aplayer :autoplay="false"
               :music=music
               :showLrc="true"
      />
    </div>

    <div v-bind:class="[musicList]"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="false"
         infinite-scroll-distance="10" class="page-music-search">

      <span class="search-result-hd">{{ total }}</span>

      <!--//SuperFileHash  SingerName-->
      <mt-cell
        :title="item.SongName"
        :label="item.SingerName"
        v-for="item in list"
        :value="item">
        <!--<span>{{ item }}</span>&nbsp;&nbsp;-->
        <!--<a @click.native="listenxx(item)">试听</a>&nbsp;&nbsp;-->
        <mt-button style="background-color:rgba(0,0,0,0); box-shadow:none;" type="default"
                   @click.native="listenxx(item)">
          <img src="../../static/img/MB_listen_256px_559571_easyicon.net.png" height="30" width="30" slot="icon">
          <!--试听-->
        </mt-button>&nbsp;&nbsp;
        <mt-button icon="download" style="background-color:rgba(0,0,0,0); box-shadow:none;" type="default"
                   @click.native="downloadMusic(item)">
          <img src="../../static/img/download.png" height="30" width="30" slot="icon">
          <!--下载-->
        </mt-button>
        <!--http://fs.w.kugou.com/201805062102/1a2351fc075911411aa4a06f35576769/G124/M03/05/17/HIcBAFqyEB-ALC1lABwX_Ths3h0040.mp3-->
        <!--<a href="javascript:;"  @click.native="downloadMusic(item)">下载</a>-->
        <a download="mp3" href="" target="blank" id="download-mp3"></a>

        <!--<span @click.native="listenxx(item.FileHash,item.SongName,item.SingerName)">试听</span>&nbsp;&nbsp;-->
        <!--<span>下载</span>-->
      </mt-cell>

    </div>


  </div>
</template>

<script type="text/javascript">

  import APILIST from '../../src/API_LIST.js';
  import {Indicator} from 'mint-ui';

  import VueAplayer from 'vue-aplayer';
  import Play from './Play.vue';

  export default {
    //   component('test-x', {
    //   template: '<div>Home component</div>'
    // });

    components: {
      'aplayer': VueAplayer,
      Play,
      'test-x': {
        template: 'Home component',
      },
    },

    data() {
      return {
        music: {
          // title: '',
          // artist: '',
          src: 'http://singerimg.kugou.com/uploadpic/softhead/400/20160426/20160426113219514.jpg',
          // pic: ''
        },
        keywords: '', // 一定得初始化？？？
        list: [],
        musicList: 'music-list',
        total: '',
        total_count: 0,
        pageSize: '10',
        page: 1,
        musicPlay: 'music-play',
        mp3_url: '',
      }
    },

    computed: {
      componentId: function () {
        return 'test-x';
      }
    },

    methods: {
      handleSearch: function (keywords) {
        console.log(keywords);
        this.musicList = '';
        // Lambda写法
        this.$http.get('/search-song/song_search_v2', {
          params: {keyword: keywords, pagesize: 20, page: '1', platform: 'WebFilter'},
          before: function () {
            // APILIST.stopBodyScroll(true);

            $(document).ready(function () {
              $(document.body).css({
                "overflow-y": "hidden"
              });
            });


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
          $(document).ready(function () {
            $(document.body).css({
              "overflow-y": "auto"
            });
          });
        }, (response) => {
          // 响应错误回调
        });

      },

      listenxx: function (item) {
        // alert(hash);
        //item.FileHash,item.SongName,item.SingerName
        const hash = item.FileHash;
        const SongName = item.SongName;
        const SingerName = item.SingerName;
        console.log(hash);

        this.$http.get('/music-info/yy/index.php?r=play/getdata', {
          params: {hash: hash,},
        }).then((response) => {
          this.music = {
            title: SongName,
            artist: SingerName,
            // src: response.data.data.info.data.play_url,
            // pic: response.data.data.info.data.img,
            // lrc: response.data.data.info.data.lyrics,
            src: response.data.data.play_url,
            pic: response.data.data.img,
            lrc: response.data.data.lyrics,
          };
          console.log(this.music);
          this.musicPlay = '';

          $(document).ready(function () {
            $(".aplayer-pic").click();
          });

        }, (response) => {
          // 响应错误回调
        });

      },

      downloadMusic: function (item) {
        const hash = item.FileHash;
        console.log(hash);
        this.$http.get('/music-info/yy/index.php?r=play/getdata', {
          params: {hash: hash,},
        }).then((response) => {
          this.mp3_url = response.data.data.play_url;

          const mp3_url = response.data.data.play_url;
          // http://fs.w.kugou.com/201806091649/a97a55252e506d0ddcd0fba4007d6b3d/G002/M02/02/11/Qg0DAFUAh1aAStqHADiblGwdmy8326.mp3
          const dir = mp3_url.split('fs.w.kugou.com')[1];
          // alert('/kugou'+ dir);
          // audio_name
          // download('/kugou'+ dir ,response.data.data.audio_name + '.mp3'); // 手机支持太差！！！！
          var a = document.getElementById("download-mp3");
          a.href = response.data.data.play_url;
          a.download = response.data.data.song_name;
          // alert(a.href);
          // alert(a.download);
          a.click();

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
          }, 100);
        } else {
          setTimeout(() => {
            const totalPage = (this.total_count + this.pageSize - 1) / this.pageSize;
            // console.log(this.total_count);
            // console.log(this.pageSize);
            // console.log(totalPage);
            const i = this.page + 1;

            this.$http.get('/search-song/song_search_v2', {
              params: {keyword: this.keywords, pagesize: 20, page: i,platform: 'WebFilter'},
              before: function (request) {
                // APILIST.stopBodyScroll(true);
                $(document).ready(function () {
                  $(document.body).css({
                    "overflow-y": "hidden"
                  });
                });
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                });
              }
            }).then((response) => {


              this.list = this.list.concat(response.data.data.lists);
              this.page = response.data.data.page;
              Indicator.close();
              // APILIST.stopBodyScroll(false);
              $(document).ready(function () {
                $(document.body).css({
                  "overflow-y": "auto"
                });
              });


            }, (response) => {
              // 响应错误回调
            });
            this.loading = false;
          }, 100);
        }

      },

    }

  }

  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {Promise}
   */
  function getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };

      xhr.send();
    });
  }

  /**
   * 保存
   * @param  {Blob} blob
   * @param  {String} filename 想要保存的文件名称
   */
  function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      const body = document.querySelector('body');

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // fix Firefox
      link.style.display = 'none';
      body.appendChild(link);

      link.click();
      body.removeChild(link);

      window.URL.revokeObjectURL(link.href);
    }
  }

  /**
   * 下载
   * @param  {String} url 目标文件地址
   * @param  {String} filename 想要保存的文件名称
   */
  function download(url, filename) {
    getBlob(url).then(blob => {
      saveAs(blob, filename);
    });
  }


</script>

<style>
  #musicSearch {
    /*top: 0;*/
    right: 0;
    left: 0;
    position: absolute;
  }

  .page-music-search1 {
    margin-top: 32px;
    /*min-height: 120vh;*/
  }

  .page-music-search {
    /*margin-top: 50px;*/
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

  .music-play {
    visibility: hidden;
    display: none;
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
