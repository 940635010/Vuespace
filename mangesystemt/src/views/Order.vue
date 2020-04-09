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
    <el-select v-model="formInline.region" placeholder="按照订单号搜索"  >
      <el-option label="按照订单号搜索" value="shanghai"></el-option>
      <el-option label="按照收件人搜索" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formInline.user" placeholder="订单号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
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
      prop="recipient"
      label="收件人"
      width="180" >
    </el-table-column>
    <el-table-column  label="订单状态" >
      <template  slot-scope="scope" >
         <el-col  >
             <span v-if="scope.row.status">未支付</span>
             <span v-else>已支付</span>
            </el-col>   
      </template>
    </el-table-column>
    <el-table-column
      prop="allPrice"
      label="订单总价">
    </el-table-column>
     <el-table-column
      prop="create_time"
      label="创建时间">
       <template slot-scope="scope"  >
        <span>{{new Date(scope.row.create_time).toLocaleString()}}</span>
      </template>
    </el-table-column>
   <el-table-column label="操作" >
      <template >
             <el-link type="primary" :underline="false">查看详情</el-link>
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
import { orderlist } from "../api/common";
import { orderseach } from "../api/common";


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
      orderlist: {
        pageNum: 1,
        pageSize: 4,
      },
      searchrequery:{
          type:"",
          value:"",
          pageNum:1,
          pageSize:4
      }
  
    
    };
  },
  mounted() {
    this.orderlists()
  },
  methods: {
    
    // 获取商品列表数据
    orderlists(){
      orderlist(this.orderlist).then(res => {
        if (!res.data.status) {
          this.tableData = res.data.data.list;
          this.total = Math.ceil(res.data.data.total / 4) * 10;
        }
      });
    },
    // 订单搜索
    seachreques(){
    orderseach(this.searchrequery).then(res => {
        if (!res.data.status) {
           this.tableData = res.data.data.list;
           this.total = Math.ceil(res.data.data.total / 4) * 10;
        }
      });
    },
    
    // 点击页码切换
    currentChange(key) {
      this.orderlist.pageNum = key;
       this.orderlists()
    },
     // 上一页
    prevClick() {
      this.orderlist.pageNum++;
      this.orderlists()
    },
    // 下一页
    nextClick() {
      this.orderlist.pageNum--;
       this.orderlists()
    },
    // 点击搜索 
    onSubmit() {
      this.orderlists()
      if(this.formInline.region=="shanghai"){
        this.searchrequery.type="orderId"
        this.searchrequery.value=this.formInline.user
        this.seachreques()
      }else if(this.formInline.region=="beijing"){
         this.searchrequery.type="recipient"
         this.searchrequery.value=this.formInline.user
          this.seachreques()
         console.log( this.searchrequery.value)
      }
    },
    // 时间戳
     testtime(fmt) {
       var date=new Date(fmt)
        var o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ""));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
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


