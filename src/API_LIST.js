/**
 * Created by Administrator on 2017/8/26.
 */

// const ishttps = 'https:' == document.location.protocol ? 'https://': 'http://';
// //
// const HOST = ishttps + window.location.host;
//
// const SEARCH_MUSIC = HOST + '/search-music';
//
// const ONLINE_LISTEN_MUSIC = HOST + '/search-music/create';
//
// const DOWNLOAD_MUSIC = HOST + '/search-music/show';

// const SEARCH_SONG = 'http://mobilecdn.kugou.com/api/v3/search/song';
const SEARCH_SONG = 'http://xblog.hzz/search-music';

function onTouchMove(inFlag) {
  alert(inFlag);
  if (inFlag) {
    document.addEventListener('touchmove', onHandler, false);
  } else {
    document.removeEventListener('touchmove', onHandler, false);
  }
}

function onHandler(e) {
  e.preventDefault();
}



export default {
  SEARCH_SONG,
  onTouchMove
};
