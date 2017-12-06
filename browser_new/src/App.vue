<template>
  <div id="app">
    <header class="title-bar">
      <router-link to="/" class="text" tag="h1">微信公众文章</router-link>
      <router-link to="/user" class="mine" tag="div">
        <span class="icon-mine"></span>
      </router-link>
    </header>
    <section class="news-content" ref="mfct">
      <ul class="news-list">
        <li class="news-item border-bottom-1px" v-for="component in components">
          <router-link class="link" :to="component.path">{{component.text}}<i
              class="cubeic-arrow"></i>
          </router-link>
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
      components: [
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
    position: relative
    height: 44px
    text-align: center
    color: #111
    font-size: 0
    h1.text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: 18px
      font-weight: 500
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px 
        font-size: 20px
        color: #111

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

