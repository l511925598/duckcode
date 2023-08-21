<template>
  <div class="search">
		<el-form :model="searchForm" label-width="80px" size="large" ref="formRef">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="用户名" prop="name">
						<el-input placeholder="请输入用户名" v-model="searchForm.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="真实姓名" prop="realname">
						<el-input placeholder="请输入真实姓名" v-model="searchForm.realname"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号码" prop="cellphone">
						<el-input placeholder="请输入手机号码" v-model="searchForm.cellphone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态" prop="enable">
						<el-select placeholder="请选择查询的状态" v-model="searchForm.enable" style="width: 100%">
							<el-option label="启用" :value="1"></el-option>
							<el-option label="禁用" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="选择日期" prop="date">
						<el-date-picker
								v-model="searchForm.date"
								type="daterange"
								range-separator="To"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btns">
			<el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
			<el-button size="large" icon="Search" type="primary" @click="handleQuery">查询</el-button>
		</div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue"
import type { ElForm } from "element-plus";

const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
	name:'',
	realname:'',
	cellphone:'',
	enable: 1,
	date:[]
})

function handleResetClick(){
	formRef.value?.resetFields()
}

function handleQuery(){
	console.log('我呗点击了')
}
</script>

<style lang="less" scoped>
.search {
	background-color: white;
	padding: 20px;
}
.el-form-item {
	padding: 20px 30px;
	margin-bottom: 0px;
}
.btns {
	text-align: right;
	padding: 0 50px 10px 0;
	.el-button {
		height: 36px;
	}
}
</style>
