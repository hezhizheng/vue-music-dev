# vue-music-dev

> vue-cli、mint-ui实现的搜歌&试听&下载的功能

> [线上演示地址](http://music.hezhizheng.com/#/search)

## 本地开发使用
``` bash
# 安装依赖包
npm install

# 本地运行项目
npm run dev

# 打包
npm run build

```
## 线上部署 Nginx
#### 反向代理
``` bash
location ^~/search-song/ {
         proxy_pass   http://songsearch.kugou.com/;
    }
location ^~/music-info/ {
         proxy_pass   http://www.kugou.com/;
}
location ^~/kugou/ {
	       proxy_pass   http://fs.w.kugou.com/;
}
```
