<template>
<div>
   <div class="cmddetails-center">
    <!-- 商品详情页 -->
    <el-row class="cmddetails-header" type="flex"  justify="space-between" align="middle">
       <el-page-header @back="goBack" content="修改商品" class="cmddetails-middle"></el-page-header>
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
                v-model="form.desc">
            </el-input>
      </el-form-item>
     <!--  商品价格-->
      <div style="margin-top: 15px;">
          <el-form-item label="商品价格">
            <el-input placeholder="请输入内容" v-model="form.price">
            <template slot="append">元</template>
            </el-input>
         </el-form-item>
      </div>
      <!-- 商品分类 -->
           <el-form-item label="商品分类">
            <el-select v-model="d" placeholder="请选择活动区域 ">
                <el-option   v-for="itme in list" :key="itme._categoryId" :lable="itme.name" :value="itme.name"></el-option>
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
       <el-button type="primary" @click="shor">确定提交</el-button>
       <el-button>重置</el-button>
    </el-col>
      </el-row>
   </template>
   </div>
     
  </div>


   </div>
</template>
<script>
import { getcategory } from "../api/common";
import { updatesp } from "../api/common";

export default {
  data() {
    return {
      d: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        input2: "",
        textarea2: ""
      },
      list: {},
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      updatesplist: {
        _id: "",
        categoryId: "",
        pCategoryI: "",
        name: "",
        desc: "",
        price: ""
      }
    };
  },
  mounted() {
    // 从商品页面商品详情数据
    this.form = this.$route.query;
    console.log(this.form)
    this.zonglist();
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    zonglist() {
      getcategory(this.categorylist).then(res => {
        if (!res.data.status) {
          this.list = res.data.data.list;
        }
      });
    },
    shor() {
      updatesp(this.updatesplist).then(res => {
          this.updatesplist.categoryId = this.form._id,
          console.log(this.form.pCategoryId)
          this.updatesplist._id = this.form._id,
          this.updatesplist.name = this.form.name,
          this.updatesplist.price = this.form.price;
          this.updatesplist.desc = this.form.desc;
        if (!res.data.status) {
          this.goBack()
          console.log(res);
        }
      });
    }
  }
};
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
  border-color: #409eff;
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


