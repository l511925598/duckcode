<template>
  <div class="account.vue">
    <el-form
      :rules="rules"
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
      style="max-width: 460px"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="formLabelAlign.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="formLabelAlign.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import {localCache} from "@/utils/cache";

const labelPosition = ref('right')

const formLabelAlign = reactive<IAccount>({
  account: localCache.getCache('name') ?? '',
  code: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? '',
})

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入你的账户', trigger: 'blur' },
    { min: 3, max: 12, message: '账户名有误', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入你的密码', trigger: 'blur' },
    { min: 6, max: 10, message: '密码长度有误', trigger: 'blur' },
  ],
})

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd:boolean) {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      const account = formLabelAlign.account
      const password = formLabelAlign.password
      const code = formLabelAlign.account
      loginStore.loginAccountAction({ account, code, password }).then(() =>{
				if (isRemPwd){
					localCache.setCache('name',account)
					localCache.setCache('code',account)
					localCache.setCache('password',password)
				}else {
					localCache.removeCache('name')
					localCache.removeCache('code')
					localCache.removeCache('password')
				}
			})
    } else {
      ElMessage({
        message: '您输入的格式有误！',
        type: 'error',
      })
    }
  })
}

defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.account.vue {
}
</style>
