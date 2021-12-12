<template>
  <div class="wrapper">
    <div class="header" v-if="this.singerInfo.artist">
      <img v-lazy="this.singerInfo.artist.picUrl" alt="">
      <div class="Info">
        <p class="name">{{this.singerInfo.artist.name}}</p>
        <span>歌手简介：</span>
        <p class="des">{{this.singerInfo.artist.briefDesc}}</p>
      </div>
    </div>
    <span v-if="this.singerInfo.artist" id="song" @click="handleShowSong" :class="activeColor(this.showSong)">歌曲({{this.singerInfo.artist.musicSize}})</span>
    <span v-if="this.singerInfo.artist" id="mv" @click="handleShowMv" :class="activeColor(this.showMv)">MV({{this.singerInfo.artist.mvSize}})</span>
    <div class="content">
        <div class="songList" v-if="this.showSong">
          <li class="item" 
            v-for="(item,index) of this.singerInfo.hotSongs"
            @click="handlePlay(item,index)" 
            :key="index">
            <span class="index">{{index+1}}</span>
            <span class="songName">{{item.name}}</span>
            <span class="songAr">{{item.al.name}}</span>
            <span 
              class="iconfont icon-woxihuan favoriteIcon"
              :id="toggleFavorite(item)"
              @click.stop="handelFavorite(item)">
            </span>
          </li>
      </div>
      <div class="mvList" v-if="this.showMv">
        <div class="mvItem"
          v-for="item of this.mvs"
          @click="handleVideo(item)"  
          :key="item.id">
            <img :src="item.imgurl" alt="">
            <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- mv播放器 -->
    <el-dialog
      :center="true"
      top="2vh"
      width="70%"
      :show-close="false"
      custom-class="dialog"
      :modal="false"
      :close-on-click-modal="false"
      :title="this.currentMV.name"
      v-if="this.dialogVisible"
      :visible.sync="dialogVisible">
      <video class="video" width="100%" controls autoplay :src="this.currentMVUrl.url"></video>
      <span>{{this.currentMV.name}}</span><br>
      <br>
      <span class="close" @click="close">×</span>
      <span>演唱：{{this.currentMV.artistName}}</span>
      <span>{{this.currentMV.playCount}} 次观看</span>
      <span>发布时间: {{this.currentMV.publishTime}}</span>
      <h3 style="margin-top:10px;margin-left:15px">评论</h3>
      <div class="mvComment">
        <div class="commentItem" v-for="(item,index) in this.mvComments" :key="index">
          <img v-lazy="item.user.avatarUrl" alt="">
          <span>{{item.user.nickname}}</span>
          <span>{{getTime(item.time)}}</span>
          <p>{{item.content}}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import date from 'date-php'
import { Toast } from 'mint-ui'
import {getSingerInfo,getSongUrl,getMv,getVideo,getmvComments} from "@/api/index"
import {mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      singerInfo:{},
      mvs:[], 
      flag:false,
      showSong:true,
      showMv:false,
      dialogVisible:false,
      currentMV:{},
      currentMVUrl:{},
      mvComments:[]
    }
  },
  computed:{
    ...mapGetters([
      'favoriteSongs'
    ])
  },
  methods: {
    close(){
      this.dialogVisible=false
      this.setPlayingState(true)
    },
    getTime(time){
      return date('Y年m月d日 H:i:s', time)
    },
    // 获取歌手单曲和个人信息
    _getSingerInfo(){
      getSingerInfo(this.$route.params.id).then((res)=>{
        this.singerInfo=res.data
      })
    },
    // 
    activeColor(flag){
    if(flag===true){
      return "activeColor"
    }else{
      return " "
    }
  },
  handleShowSong(){
    this.showSong=true
    this.showMv=false
  },
  handleShowMv(){
    this.showMv=true
    this.showSong=false
    getMv(this.singerInfo.artist.mvSize,this.$route.params.id).then((res)=>{
      this.mvs=res.data.mvs
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
  // 收藏歌曲
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
  // 播放歌曲
  handlePlay(item,index){
    this.setPlayList(this.singerInfo.hotSongs)
    this.setPlayingState(true)
    this.setCurrentSongIndex(index)
    getSongUrl(item.id).then((res)=>{
      this.setCurrentSong(res.data.data[0])
    })
  },
  // 播放mv
  handleVideo(item){
    this.currentMV=item
    this.dialogVisible=true
    this.setPlayingState(false)
    // mv地址
    getVideo(item.id).then((res)=>{
      this.currentMVUrl=res.data.data
    })
    // mv评论
    getmvComments(item.id).then((res)=>{
      this.mvComments=res.data.comments
    })
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
  created() {
    this._getSingerInfo()
  },
}
</script>
<style scoped>
.close{
  color: #fff;
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
}
.mvComments{
  width: 100%;
  height: 100%;
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
  color: rgb(121, 120, 120);
  font-size: 14px;
}
.commentItem>p{
  margin-left: 60px;
  margin-top:-10px;
}
.video{
  outline: none;
  border-radius:5px;
  height: 400px;
}
.wrapper>>>.el-dialog{
  background-color: #010101;
  overflow-y: scroll;
  height:88%;
  border: 20px solid #000;
  border-radius: 20px;
}
.wrapper>>>.el-icon-close{
  color: #fff;
  font-size: 22px;
  position: fixed;
  transform: translateX(-10px);
}
.wrapper>>>.el-dialog span{
  padding: 0px 8px;
  font-size: 14;
}
.wrapper>>>.el-dialog__body{
  color: #fff;
}
.wrapper>>>.el-dialog__header .el-dialog__title{
  color: #fff;
  text-align: center;
}
  .mvList{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:inherit;
    align-content: start;
  }
  .mvItem{
    width: 18%;
    height: 150px;
    margin-left: 50px;
    margin-top: 20px;
    cursor: pointer;
    overflow:hidden;
  }
  .mvItem img{
    width: 100%;
    height:100px;
    border-radius: 5px;
  }
  .mvItem p{
    font-size: 12px;
    text-align: center;
  }
  .wrapper{
    width: 100%;
    height:100%;
    color: #fff;
  }
  .header{
    width: 100%;
    height: 150px;
  }
  .header img{
    width: 120px;
    height: 120px;
    border-radius: 5px;
    margin-left: 20px;
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
  .item:hover{
  background-color: #cccccc29;
  }
  .favoriteIcon{
    position: absolute;
    right: 20px;
  }
  .icon-woxihuan{
    font-size: 16px;
    cursor: pointer;
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
  .Info{
    height: 25%;
    width: 100%;
    position: absolute;
    left: 150px;
    top: 0px;
    color: #fff;
  }
  .name{
    font-size: 24px;
  }
  .des{
    color: #ccc;
    font-size: 10px;
    width: 80%;
    height: 64px;
    text-indent: 20px;
    overflow-y: auto;
  }
  #song{
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 40px;
  }
  #album{
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
  }
  #mv{
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 20px;
  }
  .activeColor{
    border-bottom:2px solid #1ece9c!important;
  }
  #favorite_y{
    color: #f45555;
  }
  #favorite_n{
    color: #fff;
  }
</style>
