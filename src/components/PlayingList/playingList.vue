<template>
  <div class="wrapper">
    <span class="title">正在播放</span>
    <div class="favoriteList">
      <li id="item"
        :class="play(item)"
        @click.stop="handlePlay(item.id, index)"
        v-for="(item, index) of this.playList"
        :key="index">
        <span class="favoriteIcon">{{ index + 1 }}</span>
        <span class="songName">{{ item.name }}</span>
        <span class="songAr" v-if="item.ar">{{ item.ar[0].name }}</span>
        <span class="songAr" v-if="item.song">{{item.song.artists[0].name}}</span>
        <span class="songAr" v-if="item.artists">{{item.artists[0].name}}</span>
        <span class="playingicon" v-if="show(item)"></span>
      </li>
    </div>
  </div>
</template>
<script>
import { getSongUrl } from "@/api/index";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "playList",
      "currentSongInfo",
      "currentSongIndex",
      "playing",
    ]),
  },
  methods: {
    ...mapActions([
      "deleteFavoriteSong",
      "setCurrentSong",
      "setPlayingState",
      "setPlayList",
      "setCurrentSongIndex",
    ]),
    // 播放收藏歌曲,默认播放收藏歌曲列表
    handlePlay(id, index) {
      this.setPlayingState(true);
      this.setCurrentSongIndex(index);
      getSongUrl(id).then((res) => {
        this.setCurrentSong(res.data.data[0]);
      });
    },
    //
    play(item) {
      if (item.id == this.playList[this.currentSongIndex].id) {
        return "color";
      } else {
        return " ";
      }
    },
    show(item) {
      if (item.id == this.playList[this.currentSongIndex].id && this.playing) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.color {
  color: #1ecc94 !important;
}
.playingicon {
  display: block;
  width: 50px;
  height: 30px;
  background: url(../../assets/wave.gif) no-repeat;
  background-size: 15px 15px;
  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);
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
  white-space: nowrap;/*不允许换行*/
  overflow: hidden;/*超出隐藏*/
  text-overflow: ellipsis;/*文本超出三点代替*/
  width: 200px;
}
.songAr {
  position: absolute;
  left: 400px;

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
  height: 85%;
  margin-top: 20px;
  margin-left: 15px;
  overflow-y: auto;
}
</style>