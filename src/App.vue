<template>
  <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import Player from "@/components/Player/Player"
export default {
  name: 'App',
  data() {
    return {
    }
  },
  watch:{
  '$route':function(to,from){
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    document.getElementById("main").scrollTop=0
    }
  },
   components:{
    Player
  }
}
</script>

<style scoped>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
