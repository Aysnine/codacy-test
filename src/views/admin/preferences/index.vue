<template>
  <page-container>
    <template #header>
      <h1>{{ $t('Preferences') }} <i class="el-icon-setting"></i></h1>
    </template>

    <p>
      <b>{{ $t('admin.preferences.showTabs') }}：</b
      ><el-switch v-model="showTabs"></el-switch>
    </p>
    <p>
      <b>{{ $t('admin.preferences.showSourceLink') }}：</b
      ><el-switch v-model="showSourceLink"></el-switch>
    </p>
    <p>
      <b>{{ $t('admin.preferences.asideCollapse') }}：</b
      ><el-switch v-model="asideCollapse"></el-switch>
    </p>
    <p>
      <b>{{ $t('admin.preferences.pageTransition') }}：</b
      ><el-switch v-model="pageTransition"></el-switch>
    </p>
    <p>
      <b>{{ $t('admin.preferences.asideTransition') }}：</b
      ><el-switch v-model="asideTransition"></el-switch>
    </p>

    <el-divider />

    <p>
      <b>{{ $t('admin.preferences.flat') }}：</b
      ><el-switch v-model="flat"></el-switch>
    </p>

    <el-divider />

    <h2>{{ $t('admin.preferences.language') }}</h2>
    <el-radio-group v-model="$i18n.locale">
      <el-radio v-for="item in langs" :key="item.value" :label="item.value">{{
        item.label
      }}</el-radio>
    </el-radio-group>
  </page-container>
</template>

<script>
import {
  pageTabs,
  sourceLink,
  asideCollapse,
  pageTransition,
  asideTransition,
  flat
} from '@/store/modules/admin/mixins'
import { langs } from '@/locales'

export default {
  inject: ['@adminContainer'],
  mixins: [
    pageTabs,
    sourceLink,
    asideCollapse,
    pageTransition,
    asideTransition,
    flat
  ],

  data() {
    return {
      langs
    }
  }
}
</script>
