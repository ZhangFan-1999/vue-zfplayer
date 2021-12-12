<template>
  <div class="wrapper">
      <!-- 轮播图 -->
      <el-carousel :interval="7000" type="card" height="220px">
        <el-carousel-item v-for="(item,index) of banners" :key="index">
            <img v-lazy="item.imageUrl">
        </el-carousel-item>
      </el-carousel>
      <!-- 今日推荐 -->
      <span class="title_song">推荐单曲</span>
      <div class="recommend">
        <div class="recommendSong"
             @click="handlePlay(item,index)" 
             v-for="(item,index) of recomendSongs" 
             :key="index">
             <keep-alive>
                <img v-lazy="item.picUrl" alt="">
             </keep-alive>
          <span class="name">{{item.name}}</span>
          <span class="ar">{{item.song.artists[0].name}}</span>
        </div>
    </div>
    <span class="title_songs">推荐歌单</span>
    <div class="recommendList">
      <div class="listItem"
          v-for="(item,index) of recommendList" 
          :key="index">
          <router-link :to="{name:'ListDes',params:{id:item.id}}">
            <keep-alive>
              <img v-lazy="item.picUrl" alt="">
            </keep-alive>
            <span class="listInfo">{{item.name}}</span>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {getBanners,getRecommendSongs,getSongUrl,getSongList} from "@/api/index"
import {mapActions} from "vuex"
export default {
  data() {
    return {
      banners:[],
      recomendSongs:[],
      recommendList:[]
    }
  },
  methods: {
    // 获取轮播图
    _getBanners(){
      getBanners().then((res)=>{
        this.banners=res.data.banners
      })
    },
    // 获取推荐歌曲
    _getRecommendSongs(){
      getRecommendSongs().then((res)=>{
        this.recomendSongs=res.data.result
      })
    },
    // 获取音乐url
    handlePlay(item,index){
      this.setPlayList(this.recomendSongs)
      this.setPlayingState(true)
      this.setCurrentSongIndex(index)
      getSongUrl(item.id).then((res)=>{
        this.setCurrentSong(res.data.data[0])
      })
    },
    // 获取推荐歌单
    _getRecommendList(){
      getSongList().then((res)=>{
        this.recommendList=res.data.result
      })
    },
    // 歌单详情
    getListDes(item,index){
      this.$router.go("/listdes")
      console.log(index);
    },
    ...mapActions([
      'setCurrentSong',
      'setPlayingState',
      'playing',
      'setPlayList',
      'setCurrentSongIndex'
    ])
  },
  created() {
    this._getBanners()
    this._getRecommendSongs()
    this._getRecommendList()
  },
}
</script>
<style scoped>
.name,.ar{
  display: block;
  color: #fff;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.name{
  font-size: 16px;
}
.ar{
  color: #98918e;
}
.recommendSong{
  width: 10%;
  height: 160px;
  margin-left: 65px;
  margin-top: 10px;
  cursor: pointer;
}
.recommendSong img{
  width: 100%;
  height: 110px;
  border-radius: 5px;
}
.title_song{
  color: #fff;
  font-size: 20px;
  margin-left: 50px;
  height: 10px;
}
.title_songs{
  color: #fff;
  font-size: 20px;
  margin-left: 50px;
}
.listInfo{
  width: 100%;
  /* 必须设置display否则...不生效 */
  display: block;
  color: #fff;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  font-size: 14px;
}
.recommend{
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:inherit;
  align-content: start;
  margin-bottom: 50px;
}
.recommendList{
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:inherit;
  align-content: start;
}
.listItem{
  width: 10%;
  height: 160px;
  margin-left: 65px;
  margin-top: 10px;
  cursor: pointer;
}
.listItem img{
  width: 100%;
  height: 110px;
  border-radius: 5px;
}
.wrapper{
  width: 100%;
  height: 80%;
  overflow-y:auto;
}
.el-carousel img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.wrapper>>>.el-carousel{
  position: relative;
}
</style>
