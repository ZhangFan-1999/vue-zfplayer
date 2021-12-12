<template>
  <div class="wrapper">
    <div class="filter">
      <ul class="area">
        <li @click="handleArea(-1)" class="active">全部</li>
        <li @click="handleArea(7)">华语</li>
        <li @click="handleArea(96)">欧美</li>
        <li @click="handleArea(8)">日本</li>
        <li @click="handleArea(16)">韩国</li>
        <li @click="handleArea(0)">其他</li>
      </ul><br>
      <ul class="type">
        <li @click="handleType(-1)" class="active">全部</li>
        <li @click="handleType(1)">男歌手</li>
        <li @click="handleType(2)">女歌手</li>
        <li @click="handleType(3)">乐队</li>
      </ul>
    </div>
    <div class="content">
      <div class="item" 
        v-for="item in this.singers" 
        :key="item.id">
        <router-link :to="{name:'SingerDes',params:{id:item.id,name:item.name}}">
            <img v-lazy="item.picUrl" alt="">
          <p>{{item.name}}</p>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import {getSingers,getSingersByValue} from "@/api/index"
import {mapActions,mapGetters} from "vuex"
import $ from "jquery"
export default {
  data() {
    return {
      singers:[],
      area:-1,
      type:-1,
    }
  },
  computed:{
    ...mapGetters([
    ])
  },
  methods: {
    handleArea(area){
      this.area=area
      getSingersByValue(this.type,area).then((res)=>{
        this.singers=res.data.artists
      })
    },
    handleType(type){
      this.type=type
      getSingersByValue(type,this.area).then((res)=>{
        this.singers=res.data.artists
      })
    },
    // 获取所有歌手
    getAllSingers(){
      getSingers().then((res)=>{
        this.singers=res.data.artists
      })
    },
    ...mapActions([
    ])
  },
  created() {
    this.getAllSingers()
  },
  mounted() {
    $(function(){
    // 1、为li添加点击事件和类样式，其余的兄弟元素移除类样式
    $(".area li").click(function(){
      $(this).addClass("active").siblings().removeClass("active");
    })
    $(".type li").click(function(){
      $(this).addClass("active").siblings().removeClass("active");
    })
  })
  }
};
</script>
<style scoped>
.active{
  color: #1fce9b!important;
}
.area{
  position: absolute;
  left: 40px;
}
.type{
  position: absolute;
  left: 40px;
  margin-top: 10px;
}
.filter li{
  float: left;
  color: #fff;
  cursor: pointer;
  padding: 9px;
  }
.wrapper {
  width: 100%;
  height: 80%;
  position: relative;
  top: 0px;
  overflow-y: auto;
  font-size: 14px;
}
.filter{
  width: 100%;
  height: 80px;
}
.content{
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:inherit;
  align-content: start;
}
.item{
  width: 13%;
  height: 130px;
  margin-left: 90px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
}
.item img{
  width: 100%;
  height: 100px;
  border-radius: 5px;
}
.item p{
  text-align: center;
}
</style>