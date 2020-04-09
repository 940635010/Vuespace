import server from '../utils/request.js'

export function getFours(obj){ 
     return server({  //返回来的是一个 promise   
        method:"GET",
        url:"/api/getfours",
        params:obj
     })
}
// 登录接口
export function getLogin(obj){
    return server({    
       method:"POST",
       url:"/api/login",
       data:obj
    })

}
// 分类接口
export function getcategory(obj){
  return server({    
     method:"GET",
     url:"/api/manage/category/list",
     data:obj,
     params:obj,
  })
}
//修改分类
export function categoryupdate(obj){
  return server({    
     method:"POST",
     url:"/api/manage/category/update",
     data:obj
  })
}
//添加分类
export function categoryreques(obj){
  return server({    
     method:"POST",
     url:"/api/manage/category/add",
     data:obj
  })
}
//获取商品 列表
export function getproduct(obj){
  return server({    
     method:"GET",
     url:"/api/manage/product/list",
     data:obj,
     params:obj,
  })
}
//搜索产品
export function searchproduct(obj){
  return server({    
     method:"GET",
     url:"/api/manage/product/search",
     data:obj,
     params:obj,
  })
}
//对商品进行上架/下架处理
export function updatestas(obj){
  return server({    
     method:"POST",
     url:"/api/manage/product/updateStatus",
     data:obj
  })
}
//获取用户列表
export function userlist(obj){
  return server({    
     method:"GET",
     url:"/api/manage/user/list",
     data:obj,
     params:obj,
  })
}
//获取加色列表
export function jiaoselist(obj){
  return server({    
     method:"GET",
     url:"/api/manage/role/list",
     data:obj,
     params:obj,
  })
}

//获取订单列表
export function orderlist(obj){
  return server({    
     method:"GET",
     url:"/api/manage/order/list",
     data:obj,
     params:obj,
  })
}
//订单搜索
export function orderseach(obj){
  return server({    
     method:"GET",
     url:"/api/manage/order/search",
     data:obj,
     params:obj,
  })
}
//更新商品
export function updatesp(obj){
  return server({    
     method:"POST",
     url:"/api/manage/product/update",
     data:obj
  })
}
//添加商品
export function addgoods(obj){
  return server({    
     method:"POST",
     url:"/api/manage/product/add",
     data:obj
  })
}
//根据ID获取分类
export function categoryIDinfo(obj){
  return server({    
     method:"GET",
     url:"/api/manage/category/info",
     data:obj,
     params:obj,
  })
}
//更新用户
export function userupdate(obj){
  return server({    
     method:"POST",
     url:"/api/manage/user/update",
     data:obj
  })
}


