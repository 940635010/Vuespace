<template>

    <div>
      <router-view></router-view>
      <!-- 内容 -->
 <div class="category-center">
<el-row class="commodity-header" type="flex"  justify="space-between" align="middle">
<el-col :span="12" :push="1">
            <el-button type="primary" size="medium"  @click="open()">创建用户</el-button>
          </el-col>
</el-row>
       
 
    <!--表格内容  -->
<template>
  <el-table class="commodity-list"
    :data="tableData"
    border
    style="width: 95%">
    <el-table-column
      prop="name"
      label="角色名称"
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="180">
       <template slot-scope="scope"  >
        <span>{{new Date(scope.row.create_time).toLocaleString()}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="auth_time"
      label="授权时间">
       <template slot-scope="scope"  >
        <span>{{new Date(scope.row.auth_time).toLocaleString()}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="auth_name"
      label="授权人">
    </el-table-column>
   
   <el-table-column label="操作" >
      <template >
            <el-button size="small">设置权限</el-button>
           
      </template>
    </el-table-column>

  </el-table>
</template>
    <!--  -->
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
import { jiaoselist } from "../api/common";
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
         userlisrequey:{
          pageNum:1,
          pageSize:5
        },
        total:null,

        tableData: [],
      }
    },
     mounted() {
     this. productlists()
    },
    methods: {
      productlists(){
       jiaoselist(this.userlisrequey).then(res => {
        if (!res.data.status) {
          console.log(res.data.data.list)
          this.tableData = res.data.data.list;
          this.total = Math.ceil(res.data.data.total / 5) * 10;
        }
      });
      },
      onSubmit() {
        console.log('submit!');
      },
      // 点击页码切换
    currentChange(key) {
      this.userlisrequey.pageNum = key;
      this.productlists();
    },
     // 上一页
    prevClick() {
      this.userlisrequey.pageNum++;
      this.productlists();
    },
    // 下一页
    nextClick() {
      this.userlisrequey.pageNum--;
      this.productlists();
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
     // 创建用户
  
    open() {
      this.$prompt("请输入新分类名", "修改分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 更改分类
          // this.categoryupdates.categoryId = cateID;
          // this.categoryupdates.categoryName = value;
          // categoryupdate(this.categoryupdates).then(res => {
          //   if (!res.data.status) {
          //     // this.currentChange(this.categorylist.pageNum);
          //   } else {
          //     console.log("错误!!!!!");
          //   }
            this.$message({
              type: "success",
              message: "分类更改名为: " + value
            // });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更改"
          });
        });
    },
    }
  }
</script>
<style>
.test{
    margin-top: 20px;
}
</style>


