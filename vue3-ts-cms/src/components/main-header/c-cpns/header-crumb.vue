<template>
	<div class="header-crumb">

	</div>
<!--	<el-breadcrumb separator-icon="ArrowRight" >-->
<!--		<template v-for="item in breadcrumbs" :key="item.name">-->
<!--			<el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>-->
<!--		</template>-->
<!--	</el-breadcrumb>-->
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {mapPathTobreadcrumb} from "@/utils/mac-menus";
import {computed} from "vue";

const route = useRoute()
const breadcrumbs = computed(() => {
	 return mapPathTobreadcrumb(route.path)
})
</script>
<style lang="less" scoped>
.header-crumb {
	width: 800px;
}
</style>
