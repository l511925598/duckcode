<template>
  <div class="phone">
    <el-form :label-position="labelPosition" label-width="70px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item label="手机号码">
        <el-input v-model="formLabelAlign.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input v-model="formLabelAlign.Captcha" />
          <el-button class="get-btn" type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const formLabelAlign = reactive({
  phone: '',
  Captcha: '',
})
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
.phone {
}
</style>
