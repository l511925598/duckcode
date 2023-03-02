<template>
  <div class="login">
    <Panel></Panel>
  </div>
</template>

<script setup lang="ts">
// import service from '@/service'
import Panel from '@/views/login/login-component/panel.vue'
// service
//   .get({
//     url: '/home/multidata',
//   })
//   .then((res) => {
//     console.log(res)
//   })
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
