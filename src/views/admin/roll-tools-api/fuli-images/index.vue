<template>
  <page-container type="ghost" :body-class="$style.body">
    <template #header>
      <h2>
        {{ $t('Fuli Images') }}
        <el-link
          icon="el-icon-link"
          type="primary"
          href="https://github.com/MZCretin/RollToolsApi#%E8%8E%B7%E5%8F%96%E7%A6%8F%E5%88%A9%E5%9B%BE%E7%89%87%E5%88%97%E8%A1%A8"
          target="_blank"
          >{{ $t('Document link') }}</el-link
        >
      </h2>
    </template>
    <div
      v-infinite-scroll="loadNext"
      class="infinite-list"
      infinite-scroll-distance="100"
      :infinite-scroll-disabled="!!lock"
    >
      <template v-for="pageNumber in page">
        <async
          :key="pageNumber"
          :api="$rta.apis.image.girl_random"
          :transform="transform"
          static
          @success="success"
        >
          <template v-slot:default="{ pending, error, data }">
            <div v-if="pending">
              Loading ...
            </div>
            <div v-else-if="error">
              {{ error.message }}
            </div>
            <div v-else>
              <el-image
                v-for="item in data"
                :key="item.imageUrl"
                lazy
                class="infinite-list-item"
                :src="item.imageUrl"
                :preview-src-list="urls"
              ></el-image>
            </div>
          </template>
        </async>
      </template>
    </div>
  </page-container>
</template>

<script>
import { get, map } from 'lodash'

export default {
  inject: ['@adminContainer'],
  data() {
    return {
      page: 1,
      lock: 1,
      urls: []
    }
  },
  methods: {
    transform(response) {
      return get(response, 'data.data', [])
    },
    loadNext() {
      this.lock += 1
      this.page += 1
    },
    success(list) {
      this.urls = [...this.urls, ...map(list, 'imageUrl')]
      this.lock -= 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.infinite-list
  overflow auto
  flex 1
  .infinite-list-item
    width 20%
    min-height 100px
</style>

<style lang="stylus" module>
.body
  display flex
</style>
