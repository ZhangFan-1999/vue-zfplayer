<template>
  <div class="wrapper">
    <span class="title">播放历史</span>
    <span class="deleteAll" @click="deleteAll">清空历史</span>
    <div class="favoriteList">
      <li
        id="item"
        :class="playing(item)"
        @click.stop="handlePlay(item.id, index)"
        v-for="(item, index) of this.playHistory"
        :key="index">
        <span class="favoriteIcon">{{index+1}}</span>
        <span class="songName">{{ item.name }}</span>
        <span class="songAr" v-if="item.ar">{{ item.ar[0].name }}</span>
        <span class="songAr" v-if="item.song">{{item.song.artists[0].name}}</span>
      </li>
    </div>
  </div>
</template>
<script>
import { getSongUrl,getSongDes} from "@/api/index";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "favoriteSongs",
      "playList",
      "currentSongIndex",
      "currentSong",
      "playHistory"
    ]),
  },
  methods: {
    ...mapActions([
      "deleteFavoriteSong",
      "setCurrentSong",
      "setPlayingState",
      "setPlayList",
      "setCurrentSongIndex",
      "clearPlayHistory",
      "setSearchSong"
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
      this.setPlayList(this.playHistory);
      this.setCurrentSongIndex(index);
      getSongUrl(id).then((res) => {
        this.setCurrentSong(res.data.data[0]);
      })
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
    // 删除播放历史
    deleteAll(){
      this.clearPlayHistory()
    },
  },
};
</script>
<style scoped>
.deleteAll{
  margin-left: 300px;
  color: rgb(231, 228, 228);
  cursor: pointer;
}
.deleteAll:hover{
  color: rgb(214, 70, 70);
}
.color {
  color: #1ecc94 !important;
}
.favoriteIcon {
  margin-left: 28px;
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
  width: 200px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
}
.songAr {
  position: absolute;
  left: 400px;
  width: 200px;
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
}
#item:hover {
  background-color: #cccccc29;
}
.title {
  color: #fff;
  font-size: 24px;
  margin-left: 20px;
}
.favoriteList {
  width: 80%;
  height: 85%;
  margin-top: 20px;
  margin-left: 15px;
  overflow-y: auto;
}
</style>