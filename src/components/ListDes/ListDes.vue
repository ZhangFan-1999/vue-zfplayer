<template>
  <div class="wrapper">
    <div class="head">
      <img v-lazy="this.playListInfo.coverImgUrl" alt="">
      <div class="listInfo">
        <p class="listName">{{this.playListInfo.name}}</p>
        <p class="des">{{this.playListInfo.description}}</p>
        <p class="creator" v-if="this.playListInfo.creator">歌单制作人：{{this.playListInfo.creator.nickname}}</p>
        <p style="margin-top:10px">
          <span class="playAll" @click="playListAll">播放全部</span>
        </p>
      </div>
    </div>
    <span id="song" @click="handleShowSong" :class="activeColor(this.showSong)">歌曲</span>
    <span id="comment" @click="handleShowComment" :class="activeColor(this.showComment)">歌单评论({{this.commentsInfo.total}})</span>
    <div class="content">
      <div class="songList" v-if="this.showSong">
        <li class="item" 
          v-for="(item,index) of this.playList"
          @click="handlePlay(item,index)" 
          :key="index">
          <span class="index">{{index+1}}</span>
          <span class="songName">{{item.name}}</span>
          <span class="songAr">{{item.ar[0].name}}</span>
          <span 
            class="iconfont icon-woxihuan favoriteIcon"
            :id="toggleFavorite(item)"
            @click.stop="handelFavorite(item)"
            ></span>
        </li>
      </div>
      <div class="commentList" v-if="this.showComment">
        <div class="commentItem" 
          v-for="(item,index) of this.commentsInfo.comments" :key="index">
          <img :src="item.user.avatarUrl" alt="">
          <span>{{item.user.nickname}}</span>
          <span>{{getTime(item.time)}}</span>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getListInfo,getSongUrl,getListComments} from "@/api/index"
import {mapActions,mapGetters} from "vuex"
import date from 'date-php'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      playListInfo:[],
      playList:[],
      showSong:true,
      showComment:false,
      commentsInfo:{},
      flag:false
    };
  },
  methods: {
    getTime(time){
      return date('Y年m月d日 H:i:s', time)
    },
    _getListComments(){
      getListComments(this.$route.params.id).then((res)=>{
        this.commentsInfo=res.data
      })
    },
    handlePlay(item,index){
      this.setPlayList(this.playList)
      this.setPlayingState(true)
      this.setCurrentSongIndex(index)
      getSongUrl(item.id).then((res)=>{
        this.setCurrentSong(res.data.data[0])
      })
    },
    activeColor(flag){
      if(flag===true){
        return "activeColor"
      }else{
        return " "
      }
    },
    handleShowSong(){
      this.showSong=true
      this.showComment=false
    },
    handleShowComment(){
      this.showSong=false
      this.showComment=true
    },
    // 获取歌单信息
    _getListInfo(){
      getListInfo(this.$route.params.id).then((res)=>{
        this.playList=res.data.playlist.tracks
        this.playListInfo=res.data.playlist
      })
    },
    // 播放歌单全部歌曲
    playListAll(){
      this.setPlayList(this.playList)
      this.setPlayingState(true)
      this.setCurrentSongIndex(0)
      this.setPlayMode(0)
      // 让歌单第一首歌播放
      getSongUrl(this.playList[0].id).then((res)=>{
        this.setCurrentSong(res.data.data[0])
      })
      Toast({
        'message':'列表循环',
        'duration':1000,
        'position':'center'
      })
    },
    // 收藏icon-toggle
    toggleFavorite(song){
      // 找不到就会返回-1
      let index=this.favoriteSongs.findIndex(item=>item.id===song.id)
      if(index>-1){
        return "favorite_y"
      }else{
        return "favorite_n"
      }
    },
    handelFavorite(song){
      let index=this.favoriteSongs.findIndex(item=>item.id===song.id)
      if(index==-1){
        this.setFavoriteList(song)
        Toast({
          'message':"收藏成功",
          'position':"center",
          'duration':1000
        })
      }
    },
    ...mapActions([
      'setPlayList',
      'setPlayingState',
      'setCurrentSong',
      'setCurrentSongIndex',
      'setPlayMode',
      'setFavoriteList'
    ])
  },
  computed:{
    ...mapGetters([
      'favoriteSongs'
    ])
  },
  created() {
    this._getListInfo()
    this._getListComments()
  },
};
</script>
<style scoped>
#favorite_y{
    color: #f45555;
}
#favorite_n{
    color: #fff;
}
.favoriteIcon{
  position: absolute;
  right: 20px;
}
.icon-woxihuan{
  font-size: 16px;
  cursor: pointer;
}
.commentItem{
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(121, 120, 120);
}
.commentItem>img{
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
}
.songList{
  width: 100%;
  height: 100%;
  position: relative;
}
.item{
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  font-weight: lighter;
}
.playAll{
  background-color: #1dc390;
  border-radius: 15px;
  text-align: center;
  width: 200px;
  height: 30px;
  line-height: 25px;
  font-weight: lighter;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  }
.index{
  font-size: 14px;
  margin-left: 28px;
}
.songName{
  position: absolute;
  left: 60px;
  width: 200px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
}
.songAr{
  position: absolute;
  left: 400px;
  width: 200px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
}
.item:hover{
  background-color: #cccccc29;
}
.commentList{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.activeColor{
  border-bottom:2px solid #1ece9c!important;
}
#song{
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-left: 40px;
}
#comment{
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
}
.wrapper {
  width: 100%;
  height: 100%;
}
.head{
  width: 100%;
  height: 25%;
}
.head img{
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-left: 20px;
}
.listInfo{
  height: 25%;
  width: 100%;
  position: absolute;
  left:150px;
  top: 0px;
  color: #fff;
}
.listName{
  font-size: 24px;
  width: 100%;
}
.des{
  width: 80%;
  height: 25px;
  font-size: 10px;
  color: #ccc;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  margin-top: 5px;
}
.content{
  width: 90%;
  height: 350px;
  overflow-y: auto;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  position: relative;
}
</style>