<template>
  <div class="main-menu">
    <div class="logo">
			<img class="img" src="@/assets/img/favicon.ico" alt="">
			<div v-show="!isFold" class="title">后台管理系统</div>
		</div>
		<div class="menu">
			<el-menu
					:collapse="isFold"
					default-active="1"
					active-text-color="#fff"
					background-color="#0c2135"
					text-color="#b7bdc3"
			>
				<el-sub-menu index="1">
					<template #title>
						<el-icon><Monitor /></el-icon>
						<span>系统总览</span>
					</template>
					<el-menu-item index="1-1">核心技术</el-menu-item>
					<el-menu-item index="1-2">商品统计</el-menu-item>
				</el-sub-menu>

				<el-sub-menu index="2">
					<template #title>
						<el-icon><Setting /></el-icon>
						<span>系统管理</span>
					</template>
					<el-menu-item index="2-1">用户管理</el-menu-item>
					<el-menu-item index="2-2">部门管理</el-menu-item>
					<el-menu-item index="2-3">菜单管理</el-menu-item>
					<el-menu-item index="2-4">角色管理</el-menu-item>
				</el-sub-menu>

				<el-sub-menu index="3">
					<template #title>
						<el-icon><ShoppingTrolley /></el-icon>
						<span>商品管理</span>
					</template>
					<el-menu-item index="3-1">商品类别</el-menu-item>
					<el-menu-item index="3-2">商品信息</el-menu-item>
				</el-sub-menu>

			</el-menu>
		</div>
  </div>
</template>

<script setup lang="ts">

defineProps({
	isFold:{
		type: Boolean,
		default: false
	}
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
