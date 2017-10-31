<template>
  <div class="index">
    <scroll class="scrollwrapper" :data="dataSource">
      <new-list :news="dataSource" @select="jumpTo"></new-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import NewList from 'base/new-list/new-list'
// import Mock from 'mockjs'
import { ERR_OK } from 'api/config'
import { getNewsList } from 'api/newlist'
export default {
  data () {
    return {
      dataSource: []
    }
  },
  mounted () {
    this._fetchData()
  },
  methods: {
    jumpTo (item) {
      window.location.href = item.link
    },
    _fetchData () {
      getNewsList().then(res => {
        if (res.base_resp.ret === ERR_OK) {
          this.dataSource = res.app_msg_list
        }
      })
      // fetch('http://rapapi.org/mockjs/26963/getList?accessToken=kk')
      // .then(res => res.json())
      // .then(resText => {
      //   let data = Mock.mock(resText)
      //   if (data.code === ERR_OK) {
      //     this.dataSource = data.data
      //   }
      //   // console.log(data)
      // })
      // .catch(err => {
      //   console.warn(err)
      // })
    }
  },
  components: {
    Scroll,
    NewList
  }
}
</script>

<style lang="stylus" scoped>
  .index
    .scrollwrapper
      position fixed
      z-index 100
      top 40px
      left 0
      bottom 54px
      right 0
      background #222
</style>
