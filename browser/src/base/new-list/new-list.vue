<template>
  <div class="new-list">
    <ul>
      <li class="item" v-for="(article, index) in news" :key="index" @click="selectItem(article)">
        <div class="img">
          <img :src="article.cover" alt="">
        </div>
        <div class="content">
          <h2 class="name">{{article.title}}</h2>
          <p class="desc">{{article.comments_num}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Array,
      default: []
    }
  },
  mounted () {
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.new-list
  .item
    display flex
    align-items center
    box-sizing border-box
    font-size $font-size-medium
    color $color-text-ll
    padding 10px
    margin 0 5px
    border-bottom 1px solid $color-text-d
    .img
      flex 0 0 85px
      width 85px
      height 55px
      margin-right 15px
      text-align left
      overflow hidden
      img
        height 100%
    .content
      flex 1
      line-height 20px
      overflow hidden
      text-align left
</style>
