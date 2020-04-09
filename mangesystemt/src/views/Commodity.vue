<template>
    <div>
      <router-view></router-view>
<div class="commodity-center">
  <!-- 头部 -->
   <el-row class="commodity-header" type="flex"  justify="space-between" align="middle">
     <el-col :span="12"  type="flex"  justify="space-between" align="middle" >
       <div class="grid-content bg-purple t " >
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
      <el-form-item >
    <el-select v-model="formInline.region" placeholder="按照名称搜索"  >
      <el-option label="按照名称搜索" value="shanghai"></el-option>
      <el-option label="按照描述搜索" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formInline.user" placeholder="关键字"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
 </div>
    </el-col>

     <el-col :span="4" type="flex"  justify="space-between" align="middle">
       <div class="grid-content bg-purple ">
         
             <el-button type="primary" icon="el-icon-plus" @click="Addshangping()" >添加商品</el-button>
   
  
           
       </div>
     </el-col>
   </el-row>
   <!--头部结束  -->
   <template>
  <el-table class="commodity-list"
    :data="tableData"
    border
    style="width: 95%">
    <el-table-column
      prop="name"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="商品描述"
      width="350">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格">
    </el-table-column>
  
    <el-table-column  label="商品状态" >
      <template  slot-scope="scope" >
         <el-col :span="6" >
              <el-button size="small" v-if="scope.row.status" @click="statuhans(scope.row._id,0)">下架</el-button>
             <el-button size="small" v-else  @click="statuhans(scope.row._id,1)">上架</el-button>
            </el-col>
            
            <el-col :span="8"  :push="6">
              <el-link type="primary"  :underline="false" v-if="scope.row.status">销售中</el-link>
              <el-link type="primary"  :underline="false" v-else>已下架</el-link>
            </el-col>
            
      </template>
    </el-table-column>
   
   <el-table-column label="操作选项" >
      <template slot-scope="scope">
            <el-button size="small"  @click="handleClick(scope.row)" >详情</el-button>
            <el-button size="small"   @click="updatesj(scope.row)">修改</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>
   <!-- 分页 -->
<el-row>
  <el-col :span="24" type="flex"  justify="space-between" align="middle">
        <div class="grid-content bg-purple-dark pages-box">
          <el-pagination
            background
            layout="prev, pager, next"
             @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
            :total="total">
         </el-pagination>
       </div>
  </el-col>
</el-row>
<!--  -->
</div>
    </div>

</template>
<script>
//导入模块
import { getproduct } from "../api/common";
import { searchproduct } from "../api/common";
import { updatestas } from "../api/common";


export default {
  data() {
    return {
      show:false,
        tableData: [],
        total: null,
        formInline: {
        user: "",
        region: ""
      },
        categorylist: {
        parentId: 0,
      },
      productlist: {
        pageNum: 1,
        pageSize: 4,
      },
      // 搜索请求参数
      seachpr:{
        pageNum:1,
        pageSize:4,
        productName:"",
        productDesc:"",
      },
      //商品上架/下架操作
      statlist:{
        productId:"",
        status:null

      },
    
    };
  },
  mounted() {
    // 总分页
    // 调用 商品列表
    this.productlists()
   
    //
    //  this.$store.dispatch("actionFours")
  },
  methods: {
    //路由之间的跳转
     xiangqing(){
    },
    
    // 商品详情
    handleClick(row){
      // console.log(row)
      this.$router.push({path:'/home/product/comdetails',query:row})
      
    },
    // 修改商品
    updatesj(row){
      this.$router.push({path:'/home/product/updateProduct',query:row})
    },
    // 添加商品
      Addshangping(){
      this.$router.push({path:'/home/product/addtails'})
    },
    
    // 获取商品列表数据
    productlists(){
      getproduct(this.productlist).then(res => {
        if (!res.data.status) {
          this.tableData = res.data.data.list;
          this.total = Math.ceil(res.data.data.total / 4) * 10;
        }
      });
    },
    // 
    seachreques(){
    searchproduct(this.seachpr).then(res => {
        if (!res.data.status) {
           this.tableData = res.data.data.list;
           this.total = Math.ceil(res.data.data.total / 4) * 10;
        }
      });
    },
    // 对商品进行上架/下架处理
    statuhans(n,m){
      this.statlist.status=m
      this.statlist.productId=n

        console.log(n,m)
      updatestas(this.statlist).then(res => {
        if (!res.data.status) {
         
         this.productlists()
        
        }
      });
    },
    
    
    // 点击页码切换
    currentChange(key) {
      this.productlist.pageNum = key;
      this.productlists();
    },
     // 上一页
    prevClick() {
      this.productlist.pageNum++;
      this.productlists();
    },
    // 下一页
    nextClick() {
      this.productlist.pageNum--;
      this.productlists();
    },
    // 点击搜索   展示  产品
    onSubmit(key) {
      this.seachreques()
      console.log(key)
      if(this.formInline.region=="shanghai"){
        this.seachpr.productName=this.formInline.user
      }else if(this.formInline.region=="beijing"){
        this.seachpr.productDesc=this.formInline.user
      }

    }
  }
};
</script>
<style>
.commodity-center {
  width: 100%;
  height: 500px;
}
.commodity-header {
  width: 100%;
  height: 76px;
  line-height: 76px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}
.t{
  margin-top: 40px;
}
.commodity-list {
  margin: auto;
}
</style>


