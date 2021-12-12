<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      percent: {
        type: Number,
        default: 30
      }
    },
    methods: {
    },
    watch: {
      // 进度条的动态效果
      // percent是父组件绑定传递过来的
      percent (newPercent) {
        if(newPercent>=0){
          const barWidth=this.$refs.progressBar.clientWidth
          const offsetWidth=newPercent * barWidth
          this.$refs.progress.style.width=`${offsetWidth}px`
        }
      }
    }
  }
</script>
<style scoped>
.progress-bar{
  height: 1px;
}
.bar-inner{
  position: relative;
  top: 0px;
  height: 2px;
  background-color: #ccc;
  border-radius: 5px;
}
.progress{
  position: absolute;
  height: 2px;
  width: 100%;
  background: #23bd8c;
  border-radius: 5px;
}
</style>
