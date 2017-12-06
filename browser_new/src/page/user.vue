<template>
  <wx-page type="option-demo" title="用户中心">
    <div slot="content" class="scroll-wrapper">
      <div class="options">
        <div class="title">您好</div>
        <div class="option-list">
            <p v-if="user.username">
              <span v-text="`亲爱的 ${user.username} 用户`"></span>
              <cube-button :primary="true" @click="handleLogout">注销</cube-button>
            </p>
            <p v-else>
              <span>您未登录，请登陆注册账户</span>
              <router-link to="/signin">登录</router-link>
              <router-link to="/signup">注册</router-link>
            </p>
        </div>
      </div>
    </div>
  </wx-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import WxPage from '@/components/wx-page'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleLogout () {
      this.setUser({})
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },
  components: {
    WxPage
  }
}
</script>

