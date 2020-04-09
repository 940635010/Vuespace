<template>
<div>
   <div class="cmddetails-center">
    <!-- 商品详情页 -->
    <el-row class="cmddetails-header" type="flex"  justify="space-between" align="middle">
       <el-page-header @back="goBack" content="添加商品" class="cmddetails-middle"></el-page-header>
   </el-row>
 
     <!--  -->
   <div class="cmddetails-middle">
   <template>
      <el-form ref="form" :model="form" label-width="80px">
      <!-- 商品名称 -->
        <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
       <!-- 商品描述 -->
        <el-form-item label="商品描述">
             <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.textarea2">
            </el-input>
      </el-form-item>
     <!--  商品价格-->
      <div style="margin-top: 15px;">
          <el-form-item label="商品价格">
            <el-input placeholder="请输入内容" v-model="form.input2">
            <template slot="append">元</template>
            </el-input>
         </el-form-item>
      </div>
       <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="value"  placeholder="请选择活动区域 ">
                <el-option   v-for="itme in list" :key="itme._id" :lable="itme.name" :value="itme._id"></el-option>
            </el-select>
      </el-form-item>

       <!-- 头像上传 -->
      <el-form-item label="商品图片">
       <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <!-- 商品详情 -->

      </el-form>
       <el-row :pull="3">
    <el-col >
       <el-button type="primary" @click="handaddgood()">确定提交</el-button>
       <el-button>重置</el-button>
    </el-col>
      </el-row>
   </template>
 


   </div>
     
  </div>


   </div>
</template>
<script>
   import { addgoods } from "../api/common";
   import { getcategory } from "../api/common";
   
 
export default {
    data() {
      
        return {
          value:"",
          form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          input2: '',
          textarea2:''
        },
         list: [],
        // 添加商品
        addgoodrequery:{
          categoryId:"",
          pCategoryId:"",
          name:"",
          desc:"",
          price:"",
        },
        //获取分类请求参数
        catidlis:{
          categoryId:"0"
    
        },
        // 上传图片
         dialogImageUrl: '',
         dialogVisible: false
        }
    },
     mounted() {
    // 从商品页面商品详情数据
     this.zonglist();
     this.form= this.$route.query;
    this.handaddgood();
  },
   methods: {
       goBack() {
      this.$router.back(-1)
    },
    // 品类
      zonglist() {
      getcategory().then(res => {
        if (!res.data.status) {
          this.list = res.data.data.list;
          console.log(this.list)
        }
      });
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    //添加商品
     handaddgood(){
       console.log(this.value)
          this.addgoodrequery.categoryId=this.value
          this.addgoodrequery.pCategoryId=this.value
          this.addgoodrequery.name=this.form.name
          this.addgoodrequery.desc=this.form.desc
          this.addgoodrequery.price=this.form.price
         addgoods(this.addgoodrequery).then(res => {
        if (!res.data.status) {
          console.log(res)
        }
      });
     },
    }
 
}
</script>
<style>
/* 上传图片样式 */
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


