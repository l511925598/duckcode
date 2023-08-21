export interface ISystemSteam {
  shopList:Ishop[],
  detailsList:Idetails[]
}

 interface Ishop {
    categoryId: string
    parentId: string
    categoryName: string
    homeStyle: number
    description: string
    pic: any
}

interface Idetails {
  brief: string
  categoryId: string
  content: string
  merit: string
  oriPrice: number
  pic: string
  price: number
  prodId: string
  prodName: string
  shopId: string
  shopName: string
  skuList:null
  soldNum: number
  totalStocks: number
  transport:null
}
