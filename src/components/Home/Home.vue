<template>
  <el-container>
    <el-aside width="18%" class="menu">
      <li class="iconfont icon-yonghu" style="margin-top:65px" v-if="!hasUser" @click="userLogin">点击登录</li>
      <li class="userInfo" v-if="hasUser" @click="userLogout">
        <img v-lazy="this.userInfo.avatarUrl" alt="">
        &nbsp;{{this.userInfo.nickname}}
      </li>
      <router-link class="iconfont icon-yinle" to="/musicHouse" tag="li">音乐馆</router-link>
      <router-link class="iconfont icon-woxihuan" to="/favorite" tag="li">我喜欢</router-link>
      <router-link class="iconfont icon-yinle-liebiao" to="/playingList" tag="li">正在播放</router-link>
      <router-link class="iconfont icon-bofanglishi" to="/playHistory" tag="li">播放历史</router-link>
      <router-link v-if="hasUser" class="iconfont icon-yinle-liebiao" to="/userList" tag="li">我的歌单</router-link>
    </el-aside>
    <div class="header">
      <span class="el-icon-arrow-left" @click="routeBack"></span>
      <span class="el-icon-arrow-right" @click="routeGo"></span>
      <input type="text" id="search" autocomplete="off" class="searchBox" placeholder="搜索歌曲/歌手/专辑" @keyup.enter="inputSearch">
    </div>
    <el-main id="main">
      <transition>
        <router-view></router-view>
      </transition>
    </el-main>
    <div class="filter" :style="{
        background: 'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)),url(' + songUrl + ')'}">
    </div>
    <el-dialog
      title="登录"
      :visible.sync="logindialogVisible"
      width="30%">
      <input type="text" :value="1715269757" id="UID" autocomplete="off" class="" placeholder="请输入UID">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getUid">登 录</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="退出"
      :visible.sync="logoutdialogVisible"
      width="30%">
      <span>确定退出网易云账号？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUid">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import {getSearchRes,getUserInfo,getUserPlayList} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
import bg from '../../assets/background.jpg'
import Storage from "good-storage"
export default {
  data() {
    return {
      BG:bg,
      logindialogVisible:false,
      logoutdialogVisible:false,
      path:{
        musicHouse:"/musicHouse",
        favorite:"/favorite",
        playHistory:"/playHistory",
        playingList:"/playingList"
      },
    }
  },
  computed:{
    ...mapGetters([
      'currentSongInfo',
      'searchSong',
      'userInfo',
      'userPlayList'
    ]),
    songUrl(){
      if(this.currentSongInfo.al){
        return this.currentSongInfo.al.picUrl
      }else if(!this.currentSongInfo.al&&this.searchSong!=="0"){
        return this.searchSong
      }else if(this.searchSong=="0"&&!this.currentSongInfo.picUrl){
        return this.BG
      }else if(!this.currentSongInfo.al){
        return this.currentSongInfo.picUrl
      }
    },
    hasUser(){
      if(this.userInfo.nickname!==undefined){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapActions([
      'setSearchRes',
      'setUserInfo',
      'delUserInfo',
      'setUserPlayList'
    ]),
    routeBack(){
      this.$router.go(-1)
    },
    routeGo(){
      this.$router.go(+1)
    },
    inputSearch(){
      const search=document.getElementById("search")
      // indexof()方法如果括号内检测的字符串没有出现返回-1
      // 如果搜索空格就直接搜索五月天
      if(search.value.indexOf(" ")==0||search.value==""){
        search.value="五月天"
      }
      getSearchRes(search.value).then((res)=>{
        this.setSearchRes(res.data.result.songs)
      })
         this.$router.push(
            {path: '/searchres'},
            onComplete => {},
            onAbort => {}
         )
    },
    userLogin(){
      this.logindialogVisible=!this.logindialogVisible
    },
     userLogout(){
      this.logoutdialogVisible=!this.logoutdialogVisible
    },
    getUid(){
      this.logindialogVisible=false;
      const UID=document.getElementById("UID");
      // 获取用户信息
      getUserInfo(UID.value).then((res)=>{
        this.setUserInfo(res.data.profile)
      })
      // 登录成功后获取用户歌单
      getUserPlayList(UID.value).then((res)=>{
        this.setUserPlayList(res.data.playlist)
      })
    },
    delUid(){
      this.delUserInfo()
      this.logoutdialogVisible=false;
      if(this.$route.path!=="/musicHouse/recommend"){
        this.$router.push("/musicHouse/recommend");
      }
    }
  }
};
</script>
<style scoped>
.playList{
  margin-left:55% ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  white-space: nowrap;
  font-size: 14px;
}
.userInfo{
  margin-top: 65px!important;
}
.userInfo img{
  width: 30px;
  height: 100%;
  border-radius:50%;
}
.el-container {
  position: relative;
  top:0px;
  left:0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
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
.v-enter{
 visibility: hidden;
 opacity: 0;
}
.v-leave-to{
 display: none;
 opacity: 0;
}
.v-enter-active,
.v-leave-active{
  transition: all .3s linear;
}
.v-enter-to,
.v-leave{
  transition:  all .3s linear;
  visibility: visible;
  opacity: 1;
}
.menu li.router-link-active{
  background-color: #1ece9b;
}
.menu li{
  color: #fff;
  width: 60%;
  height: 30px;
  line-height: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  margin-top: 25px;
  text-indent: 10px;
  cursor: pointer;
}
.el-icon-arrow-left{
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.el-icon-arrow-right{
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.header{
  width: 80%;
  height: 60px;
  position: absolute;
  top: 0px;
  left: 20%;
  z-index: 100;
}
.searchBox{
  width: 200px;
  height: 30px;
  outline: none;
  border: none;
  border-radius:20px;
  text-indent: 10px;
  margin-left: 100px;
  transform: translateY(-3px);
  color: rgb(134, 133, 133);
}
#UID{
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid #ccc;
  border-radius:10px;
  text-indent: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  color: rgb(134, 133, 133);
}
.backIcon{
  transform: translateX(10px);
  cursor: pointer;
}
.el-main{
  text-align: initial;
  height:calc(90% - 60px);
  width: 80%;
  color: #333;
  padding: 0px 0px;
  position: absolute;
  left: 20%;
  top: 60px;
  overflow-x: hidden;
}
.el-aside{
  line-height: 21px;
  text-align: left;
  height: 100%;
  color: #333;
  overflow-x: hidden;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>