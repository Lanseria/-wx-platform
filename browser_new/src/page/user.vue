<template>
   <div class="user-wrapper" v-if="user._id">
   </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    if (this.user._id === undefined || !(this.user.username + this.user._id === this.user.userToken)) {
      this.$router.replace('/signin')
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
    })
  }
}
</script>

