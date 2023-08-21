import hyRequest from "@/service";

/**用户的网络请求*/
export function getShopList(params = null){
    return hyRequest.get({
        url: "/portal/app/shop/category/all",
        params
    })
}

//获取详情列表
export function getDetailsList(params?: { showChild: boolean; categoryId: any }){
    return hyRequest.get({
        url: "/portal/app/shop/prod",
        params
    })
}
