<template>
  <div class="wrapper">
    <span class="title">搜索结果</span>
    <div class="favoriteList">
      <li
        id="item"
        :class="playing(item)"
        @click.stop="handlePlay(item.id, index)"
        v-for="(item, index) of this.searchRes"
        :key="index">
        <span
          class="iconfont icon-woxihuan favoriteIcon"
          :id="toggleFavorite(item)"
          @click.stop="handelFavorite(item)"
        ></span>
        <span class="songName">{{ item.name }}</span>
        <span class="songAr" v-if="item.ar">{{ item.ar[0].name }}</span>
        <span class="songAr" v-if="item.song">{{item.song.artists[0].name}}</span>
        <span class="songAr" v-if="item.artists">{{item.artists[0].name}}</span>
      </li>
    </div>
  </div>
</template>
<script>
import { getSongUrl,getSongDes } from "@/api/index";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      "favoriteSongs",
      "playList",
      "currentSongIndex",
      "currentSong",
      'searchRes',
      "searchSong",
      "currentSongInfo"
    ]),
  },
  methods: {
    ...mapActions([
      "deleteFavoriteSong",
      "setCurrentSong",
      "setPlayingState",
      "setPlayList",
      "setCurrentSongIndex",
      "setSearchSong",
      "setFavoriteList"
    ]),
    // 删除收藏
    handleDele(index) {
      this.deleteFavoriteSong(index);
      Toast({
        message: "删除收藏",
        duration: 1000,
        position: "center",
      });
    },
    // 播放收藏歌曲,默认播放收藏歌曲列表
    handlePlay(id, index) {
      this.setPlayingState(true);
      this.setPlayList(this.searchRes);
      this.setCurrentSongIndex(index);
      getSongUrl(id).then((res) => {
        this.setCurrentSong(res.data.data[0]);
      });
      getSongDes(id).then((res)=>{
        this.setSearchSong(res.data.songs[0].al.picUrl)
      })
    },
    playing(item) {
      if (this.currentSong.id) {
        if (item.id == this.playList[this.currentSongIndex].id) {
          return "color";
        } else {
          return " ";
        }
      }
    },
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
.color {
  color: #1ecc94 !important;
}
.favoriteIcon {
  margin-left: 28px;
  color: #f45555;
}
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#item {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  font-weight: lighter;
  color: #fff;
  position: relative;
}
.songName {
  position: absolute;
  left: 60px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
  width: 200px;
}
.songAr {
  position: absolute;
  left: 400px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
  width: 200px;
}
#item:hover {
  background-color: #cccccc29;
}
.title {
  display: block;
  color: #fff;
  font-size: 24px;
  margin-left: 20px;
}
.favoriteList {
  width: 80%;
  height: 450px;
  margin-top: 20px;
  margin-left: 15px;
  overflow-y: auto;
}
</style>