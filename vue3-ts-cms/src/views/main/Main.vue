<template>
  <div class="main">
		<el-container class="main-countent">
			<el-aside  :width=" isFold ? '60px' : '210px' ">
				<main-menu :is-fold="isFold"></main-menu>
			</el-aside>
			<el-container>
				<el-header>
					<main-header @fold-change="handleFoldChange"></main-header>
				</el-header>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/main-menu.vue";
import MainHeader from "@/components/main-header/main-header.vue";
import {ref} from "vue";

const  isFold = ref(false)
function handleFoldChange(flag:boolean){
	isFold.value = flag
}
</script>
<style lang="less" scoped>
.main {
	height: 100%;
}

.main-countent {
	height: 100%;

	.el-aside {
		overflow-x: hidden;
		overflow-y: auto;
		line-height: 200px;
		text-align: left;
		cursor: pointer;
		background-color: #001529;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */
		transition: width 0.3s linear;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.el-main {
		background-color: #f0f2f5;
	}
}
</style>
