<template>
  <div class="input-option">
    <span class="name">{{ name }}</span>
    <input
      :type="inputType"
      v-model="inputValue"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'input-option'
  export default {
    name: COMPONENT_NAME,
    props: {
      name: {
        type: String
      },
      inputType: {
        type: String
      },
      value: null
    },
    data () {
      return {
        inputValue: this.value
      }
    },
    watch: {
      inputValue (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../src/common/stylus/variable.styl"

  .input-option
    display: flex
    height: 100%
    justify-content space-between
    align-items stretch
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
    .name
      flex: 0 0 120px
      padding-left: 10px
      display inline-flex
      align-items center
    input
      flex: 1 1 auto
      min-width: 1px // fix padding把width撑开的问题
      padding: 0 10px
      background-color: $color-white
      border-left: 1px solid rgba(0, 0, 0, .1)
      box-shadow: 0 0 1px 1px #eee inset
      outline: none
      &:focus
        outline: #fc9153 solid 1px;
        outline-offset: -1px;

</style>
