<template>

    <div>
      <router-view></router-view>
    <!-- 我是品类页 -->
    <div class="category-center">
    <el-row class="category-header" type="flex"  justify="space-between" align="middle">
  <el-col :span="5"  type="flex"  justify="space-between" align="middle"
  ><div class="grid-content bg-purple  ">
    <el-link type="primary" :underline="false"  @click="black">一级商品分类列表  <i v-if="ziisshow" class="el-icon-right"></i>
    <template v-if="ziisshow" >{{ziname}}</template>
    </el-link>
  </div>
  </el-col>
  <el-col :pull="25" :span="8" type="flex"  justify="space-between" align="middle">
    <div class="grid-content bg-purple ">
     <el-button type="primary" icon="el-icon-plus"  @click="dialogFormVisible=true">添加分类</el-button>
      </div>
      </el-col>
     </el-row>

    <template>
     <el-table   class="category-list"
    :data="tableData"
    border
    style="width: 95%;">
    <el-table-column
      label="商品分类"
      width="800">
      <template slot-scope="scope" >
        <span style="margin-left: 40px" >{{  scope.row.name }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作选项" >
      <template slot-scope="scope">
            <el-button size="small"  @click="open(scope.row._id)">修改分类</el-button>
             <el-button size="small" @click="handleck(scope.row._id,scope.row.name)"   v-if="isshow">查看子分类</el-button>
      
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
    </div>
  <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类列表" :label-width="formLabelWidth">
            <el-select  v-model="form.region" placeholder="一级分类">
              <el-option label="一级分类" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogqd" >确 定</el-button>
        </div>
      </el-dialog>
<!-- 添加分类结束 -->
    </div>
    </template>
<script>
import { getcategory } from "../api/common";
import { categoryupdate } from "../api/common";
import { categoryreques } from "../api/common";
export default {
  data() {
    return {
      categorylist: {
        parentId: 0,
        pageNum: 1,
        pageSize: 5,
      },
      categoryupdates: {
        categoryId: "",
        categoryName: ""
      },
      // 添加分类  请求参数
      addcat:{
      parentId:"0",
      categoryName:"",
      },

      tableData: [],
      total: null,
      isshow: true,
      ziisshow: false,
      ziname: null,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
        // 添加分类结束
    };
  },
  mounted() {
    // 总分页
    // 调用品类列表
    this.zonglist()
  },
  methods: {
    // 查看列表内容  请求
    zonglist() {
      getcategory(this.categorylist).then(res => {
        if (!res.data.status) {
          console.log(res.data.data)
          this.tableData = res.data.data.list;
          this.total = Math.ceil(res.data.data.total / 5) * 10;
        }
      });
    },
    //添加分类  请求
    catrequest(){
     categoryreques(this.addcat).then(res => {
        if (!res.data.status) {
          this.zonglist()
           console.log(res)
        }
      });
    },

    // 点击页码切换
    currentChange(key) {
      this.categorylist.pageNum = key;
      localStorage.setItem("pagekey", this.categorylist.pageNum);
      this.zonglist();
    },
    // 上一页
    prevClick() {
      this.categorylist.pageNum++;
      this.zonglist();
    },
    // 下一页
    nextClick() {
      this.categorylist.pageNum--;
      this.zonglist();
    },
    // 点击修改分类
    open(cateID) {
      this.$prompt("请输入新分类名", "修改分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 更改分类
          this.categoryupdates.categoryId = cateID;
          this.categoryupdates.categoryName = value;
          categoryupdate(this.categoryupdates).then(res => {
            if (!res.data.status) {
              this.currentChange(this.categorylist.pageNum);
            } else {
              console.log("错误!!!!!");
            }
            this.$message({
              type: "success",
              message: "分类更改名为: " + value
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更改"
          });
        });
    },
    // 查看子分类
    handleck(id, ziname) {
      this.isshow = false;
      this.ziisshow = true;
      this.ziname = ziname;
      this.categorylist.parentId=id
      this.addcat.parentId=id
      this.form.region=this.addcat.parentId
      this.zonglist()
      
      
    },
    // 退回主分类
    black() {
      this.categorylist.pageNum = localStorage.getItem("pagekey");
      this.categorylist.parentId = "0";
      this.ziisshow = false;
      this.isshow = true;
      this.zonglist();
    },
    // 添加分类    商品分类
    dialogqd(){
      //调用  添加分类  请求函数
     this.dialogFormVisible = false
     this.addcat.categoryName=this.form.name
     this.addcat.parentId=this.form.region  
     this.catrequest()
     this.zonglist()
    }
  }
};
</script>
<style>
.category-center {
  width: 100%;
  height: 500px;
}
.category-list {
  margin: auto;
}
.category-header {
  width: 100%;
  height: 76px;
  line-height: 76px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}
/* .test {
  background: red;
} */
.pages-box {
  margin-top: 30px;
}
</style>


