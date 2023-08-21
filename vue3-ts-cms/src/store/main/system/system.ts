import { defineStore } from "pinia";
import {getShopList , getDetailsList} from "@/service/main/system/system";
import type { ISystemSteam  } from "@/store/main/system/type";

const useSystemStore = defineStore('system',{
    state: ():{ shopList: ISystemSteam[]; detailsList: ISystemSteam[] } => ({
      shopList:[],
      detailsList:[]
    }),
    actions: {
       async getShopListAction(){
           const ShopListResult = await getShopList()
           this.shopList = ShopListResult.data
       },
       async getDetailsList(categoryId){
          const DetailsListResult = await getDetailsList({ categoryId: categoryId, showChild: true })
          this.detailsList = DetailsListResult.data.rows
       },
    }
})

export default useSystemStore
