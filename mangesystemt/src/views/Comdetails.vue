<template>
<div>
<div class="cmddetails-center">
    <!-- 商品详情页 -->
    <el-row class="cmddetails-header" type="flex"  justify="space-between" align="middle">
   <el-page-header @back="goBack" content="商品详情" class="cmddetails-middle"></el-page-header>
  </el-row>
  <!-- 分割内容区 -->
 <template>
     <!--商品详情页  -->
     <div class="cmddetails-middle">
   <!--  -->
       <el-row type="flex"   align="middle">
          <el-col :span="2" ><el-button type="primary" plain  autofocus>商品名称</el-button></el-col >
          <el-col :span="2" :push="1">{{list.name}}</el-col>
       </el-row>
    <el-divider><i class="el-icon-shopping-cart-full"></i></el-divider>
   <!--  -->
      <el-row type="flex"   align="middle">
          <el-col :span="2" ><el-button type="primary" plain  autofocus>商品描述</el-button></el-col >
          <el-col :span="2" :push="1">{{list.desc}}</el-col>
       </el-row>
    <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
    <!--  -->
     <el-row type="flex"   align="middle">
          <el-col :span="2" ><el-button type="primary" plain  autofocus>商品价格</el-button></el-col >
          <el-col :span="2" :push="1">{{list.price}}</el-col>
       </el-row>
    <el-divider><i class="el-icon-money"></i></el-divider>
    <!--  -->
     <el-row type="flex"   align="middle">
          <el-col :span="2" ><el-button type="primary" plain  autofocus>所属分类</el-button></el-col >
          <el-col :span="2" :push="1">{{categorylist.name}}</el-col>
       </el-row>
    <el-divider><i class="el-icon-folder-opened"></i></el-divider>
    <!--  -->
     <el-row type="flex"    justify="space-between"   align="middle">
          <el-col  ><el-button type="primary" plain  autofocus>商品图片</el-button></el-col >
          <!--  -->
          <el-col :pull="9" >     
            <div class="demo-image">
              <div  v-for="n in list.imgs" :key="n"  class="test">
                <el-image
                  style="width: 66px; height: 19px"
                  :src="list.img"
                 ></el-image>
              </div>
            </div>
            <!--  -->
          </el-col>
       </el-row>
    <el-divider><i class="el-icon-picture-outline"></i></el-divider>
    <!--  -->
     <el-row type="flex"   align="middle">
          <el-col :span="2" ><el-button type="primary" plain  autofocus>商品详情</el-button></el-col >
          <el-col v-html="list.detail" :push="1"></el-col>
       </el-row>
    <el-divider><i class="el-icon-set-up"></i></el-divider>

    
    
    </div>
 </template>
</div>
  </div>
</template>

<script>

import { categoryIDinfo } from "../api/common";

export default {
  data() {
    return {
      list: {},
       fits:'contain',
       caterequer:{
         categoryId:""
       },
       categorylist:[]
       
    };
  },
  mounted() {
    // 从商品页面商品详情数据
    this.list = this.$route.query;
    console.log(this.list)
    this.handcat()
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
      handcat(){
        console.log(this.list.categoryId)
        this.caterequer.categoryId=this.list.categoryId
        console.log( this.caterequer.categoryId)
         categoryIDinfo(this.caterequer).then(res => {
        if (!res.data.status) {
          console.log()
          this.categorylist=res.data.data
        }
      });
     },
  }
};
</script>
<style>
.cmddetails-center {
  width: 100%;
  height: 500px;
}
.cmddetails-header {
  width: 100%;
  height: 76px;
  line-height: 76px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}
.cmddetails-middle {
  width: 95%;
  margin: auto;
}
.test{
  float: left;
  margin-left: 20px;
  
}
</style>
