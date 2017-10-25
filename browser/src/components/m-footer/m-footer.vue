<template>
  <div class="footer">
    <div class="f_item"><i class="icon iconfont icon-form"></i>资讯</div>
    <div class="f_item"><i class="icon iconfont icon-smile
"></i>产品</div>
    <div class="f_item"><i class="icon iconfont icon-comments"></i>论坛</div>
    <div class="f_item"><i class="icon iconfont icon-account"></i>我</div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.footer
  position fixed
  width 100%
  bottom 0
  display flex
  color $color-text-l
  background-color $color-highlight-background
  z-index 100
  .f_item
    display flex
    flex-direction column
    flex 1
    color $color-text-l
    font-size 14px
    padding 5px 0
    .icon
      flex 1
      font-size 20px
      padding 5px
</style>
