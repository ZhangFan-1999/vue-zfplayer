<template>
  <div class="wrapper">
    <transition>
    <div class="miniPlayer" v-if="this.mini">
      <!-- <Progress v-if="this.currentSong.url" :percent="this.percent" class="progress"></Progress> -->
      <img src="../../assets/logo.png" @click="toFull" alt=""  v-if="!currentSongInfo.id" />
      <img v-lazy="currentSongInfo.al.picUrl" @click="toFull" alt="" v-if="currentSongInfo.al" />
      <img v-lazy="currentSongInfo.picUrl"  @click="toFull" alt="" v-if="currentSongInfo.picUrl" />
      <img v-lazy="searchSong"  @click="toFull" alt="" v-if="currentSongInfo.album" />
      <span class="songName" v-if="!currentSongInfo.id">请选择一首歌曲播放吧</span>
      <span class="songName" v-if="currentSongInfo.al">{{ currentSongInfo.name}}<span class="songAr">-{{ currentSongInfo.ar[0].name }}</span></span>
      <span class="songName" v-if="currentSongInfo.picUrl">{{ currentSongInfo.name}}<span class="songAr">-{{ currentSongInfo.song.artists[0].name }}</span></span>
      <span class="songName" v-if="currentSongInfo.album">{{currentSongInfo.name}}<span class="songAr">-{{currentSongInfo.artists[0].name}}</span></span>
      <span class="pre iconfont icon-qianyishou" @click="pre"></span>
      <span class="controls" :class="togglePlay()" @click="handlePlay"></span>
      <span class="next iconfont icon-qianyishou1" @click="next"></span>
      <span id="mode" :class="toggleModeIcon()" @click="changeMode"></span>
      <span class="commend el-icon-chat-dot-square"></span>
      <span v-if="this.currentSongInfo.id" class="iconfont icon-woxihuan favoriteIcon" :id="toggleFavorite()" @click.stop="handelFavorite"></span>
    </div>
    </transition>
    <transition name="m">
    <div class="fullPlayer" v-if="this.full">
      <span @click="toMini" class="el-icon-arrow-down"></span>
      <div class="left">
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="this.currentLyric">
                <p ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                >{{line.txt}}</p>
              </div>
                <div v-if="!this.currentLyric">
                <p class="text">无歌词</p>
              </div>
            </div>
          </scroll>
      </div>
      <div class="right">
        <span style="color:#fff;margin-left:10px;font-size:18px">歌曲评论</span>
        <div class="commentItem" v-for="(item,index) in this.comments " :key="index">
          <img v-lazy="item.user.avatarUrl" alt="">
          <span>{{item.user.nickname}}</span>
          <span>{{getTime(item.time)}}</span>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div class="footer">
        <Progress v-if="this.currentSong.url" :percent="this.percent" class="progress"></Progress>
        <span class="pre iconfont icon-qianyishou" @click="pre"></span>
        <span class="controls" :class="togglePlay()" @click="handlePlay"></span>
        <span class="next iconfont icon-qianyishou1" @click="next"></span>
        <span id="mode" :class="toggleModeIcon()" @click="changeMode"></span>
        <span v-if="this.currentSongInfo.id" class="iconfont icon-woxihuan favoriteIcon" :id="toggleFavorite()" @click.stop="handelFavorite"></span>
        <span class="time">{{format(this.currentTime)}}/{{format(this.duration)}}</span>
        <span class="songName" v-if="!currentSongInfo.id">请选择一首歌曲播放吧</span>
        <span class="songName" v-if="currentSongInfo.al">{{ currentSongInfo.name}}<span class="songAr">-{{ currentSongInfo.ar[0].name }}</span></span>
        <span class="songName" v-if="currentSongInfo.picUrl">{{ currentSongInfo.name}}<span class="songAr">-{{ currentSongInfo.song.artists[0].name }}</span></span>
        <span class="songName" v-if="currentSongInfo.album">{{currentSongInfo.name}}<span class="songAr">-{{currentSongInfo.artists[0].name}}</span></span>
      </div>
      <div class="filter" :style="{
        background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)),url(' + songUrl + ')'}">
      </div>
    </div>
    </transition>
    <audio
      id="audio"
      :src="currentSong.url"
      ref="audio"
      @timeupdate="updateTime"
      @canplay="canPlay"
      @ended="goPlay"
      autoplay
    ></audio>
  </div>
</template>
<script>
import Lyric from "../../plugins/lyricParser"
import bg from '../../assets/background.jpg'
import Scroll from "./scroll"
import date from 'date-php'
import { Toast } from "mint-ui";
import { mapActions, mapGetters } from "vuex";
import { getSongUrl,getSongComments,getLyric,getSongDes } from "@/api/index";
import Progress from "./Progress";
export default {
  data() {
    return {
      BG:bg,
      show: true,
      play: undefined,
      flag: false,
      duration: 0,
      currentTime: 0,
      mini:true,
      full:false,
      comments:[],
      currentLyric:undefined,
      currentLineNum:0,
    };
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "currentSongInfo",
      "playing",
      "currentSongIndex",
      "playList",
      "mode",
      "favoriteSongs",
      "favoriteSongIndex",
      "searchSong"
    ]),
    // 进度条百分比
    percent() {
      return this.currentTime / this.duration;
    },
    songUrl(){
      if(this.currentSongInfo.al){
        return this.currentSongInfo.al.picUrl
      }else if(!this.currentSongInfo.al&&this.searchSong!=="0"){
        return this.searchSong
      }else if(this.searchSong=="0"){
        return this.BG
      }
    }
  },
  methods: {
    getTime(time){
      return date('Y年m月d日 H:i:s', time)
    },
    ...mapActions([
      "setPlayingState",
      "setCurrentSongIndex",
      "setCurrentSong",
      "setPlayMode",
      "setFavoriteList",
      "deleteFavoriteSong",
      "setPlayList",
      "setPlayHistory",
      "setSearchSong"
    ]),
    toMini(){
      this.mini=true
      this.full=false
    },
    toFull(){
      if(this.currentSongInfo.id){
        this.mini=false
        this.full=true
      }else{
        Toast({
          message: "当前无歌曲播放",
          duration: 1000,
          position: "center",
        });
      }
    },
    // 收藏和取消收藏icon切换
    toggleFavorite() {
      if (this.isFavorite(this.currentSongInfo)) {
        // 找到了就返回图标选中
        return "favorite_y";
      } else {
        // 没找到就不选中
        return "favorite_n";
      }
    },
    // 处理收藏、取消收藏
    handelFavorite() {
      if (this.isFavorite()) {
        this.deleteFavoriteSong(this.favoriteSongIndex);
        Toast({
          message: "取消收藏",
          duration: 1000,
          position: "center",
        });
      } else {
        this.setFavoriteList(this.currentSongInfo);
        Toast({
          message: "收藏成功",
          duration: 1000,
          position: "center",
        });
      }
    },
    // 判断当前歌曲是否添加过
    isFavorite() {
      const index = this.favoriteSongs.findIndex(
        (item) => item.id === this.currentSong.id
      );
      // 没有找到符合条件的元素就会返回-1,找到了就返回找到的符合条件的一个元素的索引最小是0
      return index > -1;
    },
    // 当前audio的ended后判断mode的类型
    goPlay() {
      // this.currentLyric.seek(0)
      if (this.mode == 0) {
        this.next();
      } else {
        this.$refs.audio.play();
      }
    },
    // 切换播放模式icon
    toggleModeIcon() {
      return this.mode == 1 ? "el-icon-refresh-right" : this.mode == 0 ? "el-icon-refresh" : "el-icon-refresh";
    },
    // 播放模式
    changeMode() {
      this.setPlayMode((this.mode + 1) % 2);
      if (this.mode == 1) {
        Toast({
          message: "单曲循环",
          position: "center",
          duration: 1000,
        });
      } else {
        Toast({
          message: "列表循环",
          position: "center",
          duration: 1000,
        });
      }
    },
    // 上一首
    pre() {
      if(this.currentSongInfo.id){
        let index = this.currentSongIndex - 1;
        this.setPlayingState(true);
        // 如果到了第一首歌就接上当前歌单的最后一首形成一个循环
        if (index == -1) {
          index = this.playList.length - 1;
        }
        this.setCurrentSongIndex(index);
        getSongUrl(this.currentSongInfo.id).then((res) => {
          this.setCurrentSong(res.data.data[0]);
        })
        getSongDes(this.currentSongInfo.id).then((res)=>{
          this.setSearchSong(res.data.songs[0].al.picUrl)
        })
      }else{
         Toast({
          message: "当前播放列表为空",
          duration: 1000,
          position: "center",
        });
      }
    },
    // 下一首
    next() {
      if(this.currentSongInfo.id){
        let index = this.currentSongIndex + 1;
        this.setPlayingState(true);
        // 如果到了最后一首就回到第一首歌
        if (index == this.playList.length) {
          index = 0;
        }
        this.setCurrentSongIndex(index);
        getSongUrl(this.currentSongInfo.id).then((res) => {
          this.setCurrentSong(res.data.data[0]);
        })
        getSongDes(this.currentSongInfo.id).then((res)=>{
          this.setSearchSong(res.data.songs[0].al.picUrl)
        })
      }else{
        Toast({
          message: "当前播放列表为空",
          duration: 1000,
          position: "center",
        });
      }
    },
    // 播放暂停的切换
    togglePlay() {
      if (this.playing) {
        return "el-icon-video-pause";
      }
      return "el-icon-video-play";
    },
    handlePlay() {
      if(this.currentSongInfo.id){
      // 当点击暂停或播放歌曲时让歌词暂停或播放
        if(this.currentLyric){
          this.currentLyric.togglePlay()
        }
        if (this.playing) {
          this.setPlayingState(false);
          this.$refs.audio.pause();
        } else {
          this.setPlayingState(true);
          this.$refs.audio.play();
        }
      }else{
        Toast({
          message: "当前播放列表为空",
          duration: 1000,
          position: "center",
        });
      }
    },
    // 当歌曲可以播放后获取时间和评论
    canPlay() {
      this.getSongComs()
      this.getSongLyric()
      this.duration = this.$refs.audio.duration;
      this.setPlayHistory(this.currentSongInfo);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    // 补0操作
    pad(num){
      var n=2
      let len=num.toString().length
      if(len<n){
        num='0'+num
        len++
      }
      return num
    },
    // 分秒时间戳的转换
    format(time){
      time=time | 0
      const minute = time / 60 | 0
      const second = this.pad(time % 60) 
      return `${minute}:${second}`
    },
    // 获取歌曲评论
    getSongComs(){
      getSongComments(this.currentSong.id).then((res)=>{
        this.comments=res.data.hotComments
      })
    },
    // 获取歌词
    handleLyric({lineNum,txt}){
      this.currentLineNum=lineNum
      if(lineNum>5){
        let lineEl=this.$refs.lyricLine[lineNum-4]
        try{
          this.$refs.lyricList.scrollToElement(lineEl,1000) 
        }catch(err){}
      }else{
          try{
            this.$refs.lyricList.scrollTo(0,0,1000)
        }catch(err){}
      }
    },
    getSongLyric(){
      getLyric(this.currentSong.id).then((res)=>{
        if(res.data.lrc){
          this.currentLyric=new Lyric(res.data.lrc.lyric,this.handleLyric)
        }else{
          this.currentLyric=undefined
        }
        if(this.playing&&this.currentLyric!==undefined){
          this.currentLyric.play()
        }
      })
    }
  },
  watch:{
    // 修复切换歌曲时歌词跳来跳去的bug
    currentSong(){
      if(this.currentLyric!==undefined){
        this.currentLyric.stop()
      }
    },
    playing(){
      if(this.playing){
        this.$refs.audio.play()
      }else{
        this.$refs.audio.pause()
      }
    }
  },
  components: {
    Progress,
    Scroll
  },
};
</script>
<style lang="stylus" scoped>
.middle-r
  position:absolute
  bottom:10%
  width: 100%
  height: 85%
  overflow: hidden
  .lyric-wrapper
    width: 80%
    margin: 0 auto
    overflow: hidden
    text-align: center
    .text
      line-height: 32px
      color: #fff
      font-size: 16px
      cursor: pointer;
      &.current
        color: #1ecc96
        font-size :18px
        font-weight: bolder;
</style>
<style scoped>
.filter{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index:-9;
  transform: scale(2);
  filter:blur(12px);
  height:100%;
  width:100%;
}
.commentItem{
  margin-top: 10px;
  width: 100%;
  padding: 10px 0px;
}
.right .commentItem img{
  display: inline;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  margin-top: 10px;
}
.commentItem>span{
  display: block;
  transform: translateY(-25px);
  margin-left: 60px;
  color: #fff;
  font-size: 14px;
}
.commentItem>p{
  margin-left: 60px;
  margin-top:-10px;
  color: #fff;
}
.right{
  width: 40%;
  height: 71%;
  position: absolute;
  right: 150px;
  top: 40px;
  overflow-y:auto;
  overflow-x: hidden;
}
.left{
  position: absolute;
  left: 100px;
  width: 40%;
  height: 79%;
}
.left .lyric{
  position: absolute;
  top: 260px;
  left: 0px;
  width: 100%;
  height: 240px;
}
.left img{
  width: 250px;
  height: 250px;
  position: absolute;
  left: 140px;
  border-radius:5px;
}
.footer{
  width: 80%;
  height: 80px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.footer .pre{
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translateY(-50%);
}
.footer .songName{
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translateY(-50%);
  font-size: 14px;
}
.footer .next{
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translateY(-50%);
}
.footer .controls{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
}
.footer #mode{
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}
.footer .time{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 34%;
  color: #fff;
}
.footer .favoriteIcon{
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translateY(-50%);
}
.footer .progress{
  margin-top: 0px;
}
.fullPlayer{
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 200;
  overflow:hidden;
  background-color: #fff;
}
.miniPlayer {
  width: 83%;
  height: 60px;
  position: fixed;
  bottom: 0px;
  left: 20%;
  color: #fff;
  line-height: 60px;
  z-index: 111;
}
.el-icon-arrow-down{
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
}
.wrapper{
  width: 100%;
  height: 100%;
}
.progress {
  margin-top: -4px;
  border-radius: 5px;
}
#favorite_y {
  color: #f45555;
}
#favorite_n {
  color: #fff;
}
.favoriteIcon {
  position: absolute;
  left: 100px;
  top: 11px;
  cursor: pointer;
}
#mode {
  position: absolute;
  left: 650px;
  line-height: 60px;
  font-size: 25px;
  cursor: pointer;
}
.commend {
  position: absolute;
  left: 700px;
  line-height: 60px;
  font-size: 18px;
}
.el-icon-chat-dot-square {
  font-size: 25px;
}
.pre,
.next,
.controls {
  color: #fff;
  font-size: 35px;
  cursor: pointer;
}
.pre {
  position: absolute;
  left: 420px;
}
.controls {
  position: absolute;
  left: 470px;
  line-height: 60px;
}
.next {
  position: absolute;
  left: 520px;
}
.songName,
.songAr {
  font-size: 13px;
}
.songName {
  position: absolute;
  left: 100px;
  top: -10px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 290px;
  font-size: 16px!important;
}
.songAr {
  color: #989591;
}
.miniPlayer img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  border-radius: 5px;
  cursor: pointer;
}
.v-enter{
  transform: translateY(100%);
}
.v-enter-to,
.v-leave{
   transition:  all .4s ease-in-out;
}
.m-enter{
 visibility: hidden;
 opacity: 0;
}
.m-leave-to{
 display: none;
}
.m-enter-active,
.m-leave-active{
 transition: all .2s linear;
}
.m-enter-to,
.m-leave{
  transition:  all .2s linear;
 visibility: visible;
 opacity: 1;
}
</style>