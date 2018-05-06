<template>

  <div id="vue-play">
    <aplayer autoplay
             :music=music
    />
  </div>

</template>

<script type="text/javascript">

  import VueAplayer from 'vue-aplayer';

  export default {
    data() {
      return {
        music: {
          title: 'secret base~君がくれたもの~',
          artist: 'Silent Siren',
          src: 'http://fs.w.kugou.com/201805061405/f7fdeb4bf988e4999c1535a2826d1385/G124/M03/05/17/HIcBAFqyEB-ALC1lABwX_Ths3h0040.mp3',
          pic: 'http://singerimg.kugou.com/uploadpic/softhead/400/20170807/20170807113824737.jpg'
        },
      }
    },
    components: {
      'aplayer': VueAplayer,
    },

  }
</script>

<style>

</style>
