<template>
  <div class="wrapper">
    <div class="songList">
      <div class="listItem" v-for="(item,index) of topList" :key="index">
        <router-link :to="{ name: 'ListDes', params: { id: item.id } }">
            <img v-lazy="item.coverImgUrl" alt="" />
          <span class="listInfo">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {getTopList} from "@/api/index"
export default {
  data() {
    return {
      topList:[]
    }
  },
  methods: {
    _getTopList(){
      getTopList().then((res)=>{
        this.topList=res.data.list
      })
    }
  },
  created() {
    this._getTopList()
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 80%;
}
.songList{
  height: 100%;
  overflow-y:auto;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: inherit;
  align-content: start;
}
.listItem{
  width: 10%;
  height: 160px;
  margin-left: 55px;
  margin-top: 3px;
  cursor: pointer;
}
.listItem img{
  width: 100%;
  height: 110px;
  border-radius: 5px;
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
</style>