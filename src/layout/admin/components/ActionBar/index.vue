<template>
  <div class="action-bar-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ActionBar'
}
</script>

<style lang="stylus" scoped>
$gutter = 5px

.action-bar-container
  display flex
  flex-direction row
  justify-content flex-end
  padding $gutter * .5
</style>
