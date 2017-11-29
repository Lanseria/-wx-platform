<template>
  <div id="app">
    <header class="title-bar">
      <h1>微信公众文章</h1>
    </header>
    <section class="news-content" ref="mfct">
      <ul class="news-list">
        <li class="news-item border-bottom-1px" v-for="(item, index) in news" :key="index">
          <router-link class="link" :to="item.path">{{item.text}}<i class="cubeic-arrow"></i></router-link>
        </li>
      </ul>
    </section>
    <transition name="move">
      <router-view class="news-view"></router-view>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      news: [
        {
          path: '/button',
          text: 'Button'
        },
        {
          path: '/checkbox',
          text: 'Checkbox'
        },
        {
          path: '/checkbox-group',
          text: 'CheckboxGroup'
        },
        {
          path: '/loading',
          text: 'Loading'
        },
        {
          path: '/tip',
          text: 'Tip'
        },
        {
          path: '/popup',
          text: 'Popup'
        },
        {
          path: '/toast',
          text: 'Toast'
        },
        {
          path: '/picker',
          text: 'Picker'
        },
        {
          path: '/time-picker',
          text: 'TimePicker'
        },
        {
          path: '/dialog',
          text: 'Dialog'
        },
        {
          path: '/action-sheet',
          text: 'ActionSheet'
        },
        {
          path: '/scroll',
          text: 'Scroll'
        },
        {
          path: '/slide',
          text: 'Slide'
        },
        {
          path: '/index-list',
          text: 'IndexList'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new BScroll(this.$refs.mfct, {
        click: true
      })
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    background-color: #fff
  .title-bar
    position: fixed
    z-index: 10
    right: 0
    left: 0
    height: 44px
    line-height: 44px
    text-align: center
    background-color: #f7f7f7
    box-shadow: 0 1px 6px #ccc
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    h1
      font-size: 18px
      font-weight: 500

  .news-content
    position: fixed
    width: 100%
    top: 44px
    left: 0
    bottom: 0
    overflow: scroll
    .news-list
      padding-left: 10px
      .news-item
        height: 40px
        line-height: 40px
        .link
          display: block
          position: relative
          width: 100%
          color: #333
          text-decoration: none
          outline: 0
          .cubeic-arrow
            position: absolute
            right: 0
            padding: 0 5px
            color: #ccc

  .news-view
    transition: all 0.3s
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transform: translate3d(100%, 0, 0)

</style>

