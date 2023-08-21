<template>
  <div class="main-menu">
    <div class="logo">
			<img class="img" src="@/assets/img/favicon.ico" alt="">
			<div v-show="!isFold" class="title">后台管理系统</div>
		</div>
		<div class="menu">
			<el-menu
					:collapse="isFold"
					:default-active="defaultActive"
					active-text-color="#fff"
					background-color="#0c2135"
					text-color="#b7bdc3"
			>

				<el-sub-menu index="/main/system/">
					<template #title>
						<el-icon><Setting /></el-icon>
						<span>系统管理</span>
					</template>
					<el-menu-item index="/main/system/user" @click="handleItemClick('/main/system/user')">用户管理</el-menu-item>
					<el-menu-item index="/main/system/department" @click="handleItemClick('/main/system/department')">部门管理</el-menu-item>
				</el-sub-menu>

				<el-sub-menu index="/main/analysis/">
					<template #title>
						<el-icon><Monitor /></el-icon>
						<span>系统总览</span>
					</template>
					<el-menu-item index="/main/analysis/dashboard" @click="handleItemClick('/main/analysis/dashboard')">商品统计</el-menu-item>
					<el-menu-item index="/main/analysis/overview" @click="handleItemClick('/main/analysis/overview')">核心技术</el-menu-item>
				</el-sub-menu>

				<el-sub-menu index="/main/three/">
					<template #title>
						<el-icon><ShoppingTrolley /></el-icon>
						<span>three.js</span>
					</template>
					<el-menu-item index="/main/three/round" @click="handleItemClick('/main/three/round')">初体验</el-menu-item>
					<el-menu-item index="/main/three/material" @click="handleItemClick('/main/three/material')">材质/性能检测器</el-menu-item>
					<el-menu-item index="/main/three/dat" @click="handleItemClick('/main/three/dat')">控制器</el-menu-item>
				</el-sub-menu>

			</el-menu>
		</div>
  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {mapPathToMenu} from "@/utils/mac-menus";

defineProps({
	isFold:{
		type: Boolean,
		default: false
	}
})
function handleItemClick(path){
	router.push(path)
}

const route = useRoute()
const defaultActive = computed(() => {
	const pathMenu = mapPathToMenu(route.path)
	return pathMenu?.path
})
</script>

<style lang="less" scoped>
.main-menu {
	height: 100%;
	background-color: #001529;
}
.logo{
	display: flex;
	height: 28px;
	padding: 12px 10px 8px 10px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;

	.img{
		height: 100%;
		margin: 0 10px;
	}

	.title {
		font-weight: 700;
		color: #fff;
		white-space: nowrap;
	}
}

.el-menu{
	border-right: none;
	user-select: none;
}

.el-sub-menu{
	.el-menu-item{
		padding-left: 50px !important;
		background-color: #0c2135;
	}

	.el-menu-item:hover{
		color: #fff;
	}

	.el-menu-item.is-active{
		background-color: #0a60bd;
	}
}
</style>
