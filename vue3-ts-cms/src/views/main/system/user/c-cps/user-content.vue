<template>
  <div class="user-content">
		<div class="content">
			<div class="header">
				<h3 class="title">用户列表</h3>
				<el-button type="primary">新增用户</el-button>
			</div>
			<div class="table">
				<el-table :data="shopList">
					<el-table-column prop="categoryName" label="商品名称"/>
					<el-table-column prop="description" label="描述" />
					<el-table-column align="right">
						<template #default="scope">
							<el-button @click="handleEdit(scope.$index, scope.row)">
								详情
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination"></div>
		</div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system";
import {storeToRefs} from "pinia";
import router from "@/router";
//获取仓库地址
const systemStore = useSystemStore()
//调用仓库方法
systemStore.getShopListAction()
//获取仓库值
const { shopList } = storeToRefs(systemStore)
function handleEdit(index,item){
	systemStore.getDetailsList(item.categoryId)
	router.push('/main/system/department')
}

</script>

<style lang="less" scoped>
.user-content {
	background-color: white;
	margin-top: 20px;
	padding: 20px;

	.pagination {

	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 10px;

		.title {
			font-size: 22px ;
		}
	}
}
</style>
