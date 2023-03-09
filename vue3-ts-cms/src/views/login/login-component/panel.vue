<template>
  <div class="login-panel">
    <!--    标题-->
    <h1 class="title">后台管理系统</h1>
    <!--    切换登录方式-->
    <div class="tabs">
      <!--    账号登录-->
      <el-tabs v-model="activeName" stretch type="border-card">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <Account ref="accountRef" />
        </el-tab-pane>
        <!--    手机登录-->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <Phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--    登录选择配置-->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!--    登录按钮-->
    <el-button @click="login" class="login-btn" type="primary" size="large">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import Account from '@/views/login/login-component/account.vue'
import Phone from '@/views/login/login-component/phone.vue'
import { ref ,watch} from 'vue'
import {localCache} from "@/utils/cache";

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd,(newValue) =>{
	localCache.setCache('isRemPwd',newValue)
})
// const accountRef = ref<InstanceType<typeof Account>>()
const accountRef = ref<any>()
function login() {
  if (activeName.value === 'account') {
    accountRef.value.loginAction(isRemPwd.value)
  } else {
    console.log('用户在用手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
