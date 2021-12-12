<template>
  <div class="wrapper">
    <!-- 音乐馆头部 -->
    <span class="title">音乐馆</span>
    <div class="head">
      <router-link style="margin-left:20px" to="/musicHouse/recommend" >今日推荐</router-link>
      <router-link  to="/musicHouse/playlist" >榜单</router-link>
      <router-link  to="/musicHouse/singer" >歌手</router-link>
    </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
};
</script>
<style scoped>
.head{
  margin: 30px 0px;
  height: 5%;
}
.head a{
  color: #fff;
  margin: 0px 8px;
  cursor: pointer;
}
.head a.router-link-active{
  border-bottom: 2px solid #1ece9b;
  color: #fff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.title{
  display: block;
  color: #fff;
  font-size: 24px;
  margin-left:20px;
}
</style>
