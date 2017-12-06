<template>
  <wx-page type="option-demo" title="登录">
    <div slot="content" class="scroll-wrapper">
      <div class="options">
        <div class="title">登录</div>
        <div class="option-list">
          <div class="group">
            <input-option class="item" inputType="text" name="用户名" :value.sync="username"></input-option>
            <input-option class="item" inputType="password" name="密码" :value.sync="password"></input-option>
          </div>
          <div class="group">
            <cube-button
              :outline="true"
              :primary="true"
              @click="getSignin">登录</cube-button>
          </div>
        </div>
      </div>
    </div>
  </wx-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api'
import WxPage from '@/components/wx-page'
import InputOption from '@/components/input-option'
export default {
  data () {
    return {
      username: '',
      password: '',
      _id: null
    }
  },
  created () {
    if (this.user.id) {
      this.$router.replace('/')
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapMutations({
      setUser: 'SET_USER'
    }),
    async getSignin () {
      let toast = this.$createToast({
        time: 0,
        txt: '加载中...'
      })
      toast.show()
      try {
        const res = await api.get(`/user/?username=${this.username}&password=${this.password}`)
        this._id = res.data
        toast.hide()
        toast = this.$createToast({
          time: 1000,
          txt: '登录成功'
        })
        toast.show()
        this.$router.replace('/')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.hide()
          toast = this.$createToast({
            time: 1000,
            txt: '用户名、密码错误'
          })
          toast.show()
          this.$router.replace('/signin')
        } else {
          console.log(error)
        }
      }
    }
  },
  components: {
    WxPage,
    InputOption
  }
}
</script>

<style lang="stylus">
  .scroll-wrapper
    .cube-pulldown-wrapper
      .before-trigger
        font-size: 30px
        align-self: flex-end
        span
          display: inline-block
          transition: all 0.3s
          color: #666
          &.rotate
            transform: rotate(180deg)
  .scroll-list-wrap
    position relative
    height: 480px
    border: 1px solid rgba(0, 0, 0, .1)
    border-radius: 5px
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
</style>

