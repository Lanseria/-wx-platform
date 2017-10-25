<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MFooter from 'components/m-footer/m-footer'
export default {
  name: 'app',
  components: {
    MHeader,
    MFooter
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  h1
    font-size 40px
    margin 20px 0
</style>
