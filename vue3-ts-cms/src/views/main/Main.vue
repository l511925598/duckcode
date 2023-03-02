<template>
  <div class="main">
    <h2>主页</h2>
    <button @click="handleExitClick">推出登录</button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>
<style lang="less" scoped>
.main {
}
</style>
