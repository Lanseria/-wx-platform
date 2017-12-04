<template>
  <wx-page type="option-demo" title="注册">
    <div slot="content" class="scroll-wrapper">
      <div class="options">
        <div class="title">注册</div>
        <div class="option-list">
          <div class="group">
            <input-option class="item" inputType="text" name="用户名" :value.sync="username"></input-option>
            <input-option class="item" inputType="password" name="密码" :value.sync="password"></input-option>
          </div>
          <div class="group">
            <cube-button
              :outline="true"
              :primary="true"
              @click="postSignup">注册</cube-button>
          </div>
        </div>
      </div>
    </div>
  </wx-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api'
import User from '@/common/js/user'
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
    if (this.user || this.user._id + this.user.username === this.user.userToken) {
      this.$router.replace('/index')
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
    async postSignup () {
      let toast = this.$createToast({
        time: 0,
        txt: '加载中...'
      })
      toast.show()
      try {
        const res = await api.post('/user', {
          username: this.username,
          password: this.password
        })
        this._id = res.data
        this.setUser(new User(this._id, this.username))
        toast.hide()
        toast = this.$createToast({
          time: 1000,
          txt: '注册成功'
        })
        toast.show()
        this.$router.replace('/signin')
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.hide()
          toast = this.$createToast({
            time: 1000,
            txt: '用户已存在'
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

