<template>
  <div class="header">
    IT之家
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.header
  position fixed
  top 0
  display block
  width 100%
  background-color $color-highlight-background
  color $color-text-l
  font-size $font-size-large
  line-height 40px
  z-index 100
</style>

