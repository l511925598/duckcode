<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
			<el-icon size="28px">
				<component :is="isFold ? 'Expand' : 'Fold' "/>
			</el-icon>
		</div>
		<div class="content">
			<div class="breadcrumb">
				面包xie
			</div>
			<div class="info">个人信息</div>
		</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick(){
	isFold.value = !isFold.value
	emit('foldChange',isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
	display: flex;
	align-items: center;
	flex: 1;
	height: 100%;

	.menu-icon {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		padding: 0 18px;
	}
}
</style>
