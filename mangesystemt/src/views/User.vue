<template>

    <div>
      <router-view></router-view>
      <!-- 内容 -->
 <div class="category-center">
         <el-row class="cmddetails-header" >
          <el-col :span="12" :push="1">
            <el-button type="primary" size="mini"  @click="dialogFormVisible=true">创建用户</el-button>
          </el-col>
        </el-row>
 
    <!--表格内容  -->
<template>
  <el-table class="commodity-list"
    :data="tableData"
    border
    style="width: 95%">
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
    </el-table-column>
   <el-table-column 
      
      prop="create_time"
      label="注册时间">
      <template slot-scope="scope"  >
        <span>{{new Date(scope.row.create_time).toLocaleString()}}</span>
      </template>

    
    </el-table-column>
     
      <el-table-column
      prop="role_id"
      label="权限角色">

       <template slot-scope="scope"  >
        <span>{{ getName(scope.row.role_id)}}</span>
      </template>
       </el-table-column>
    
   
   <el-table-column label="操作选项" >
      <template >
            <el-button size="small" @click="updateuservisible=true">修改</el-button>
             <el-button  size="small"  @click="open">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>
    <!--  -->

    <!-- 创建用户 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules"  label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="pho" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="邮箱" prop="emil" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="js" :label-width="formLabelWidth">
            <el-select  v-model="form.region" placeholder="一级分类">
              <el-option label="一级分类" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
        </div>
      </el-dialog>
    <!-- 添加用户结束 -->
    <!-- 修改用户 -->
     <el-dialog title="修改用户" :visible.sync="updateuservisible">
        <el-form :model="form" :rules="rules"  label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="pwd" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="pho" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        
          <el-form-item label="角色" prop="js" :label-width="formLabelWidth">
            <el-select  v-model="form.region" placeholder="一级分类">
              <el-option label="一级分类" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
        </div>
      </el-dialog>
    <!-- 结束修改用户 -->
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
import { userlist } from "../api/common";
// import { userupdate } from "../api/common";


// 时间戳
// 时间戳

    // 时间戳结束
  export default {
    data() {
      return {
        dialogFormVisible: false,
        updateuservisible:false,
        form: {
          name: 'rrrr',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 添加用户
          rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pwd:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pho:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          emil:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          js:[
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        },
      
        formLabelWidth: '120px',
        // 获取用户列表请求参数
        userlisrequey:{
          pageNum:1,
          pageSize:5
        },
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        total:null,
        cList:[],
      }
    },
    mounted() {
     this.productlists()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      // 获取名称
      getName(id){
         var userlist= this.cList.find(item=>{
           return item._id==id
         })
         return userlist.name
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
     productlists(){
       userlist(this.userlisrequey).then(res => {
        if (!res.data.status) {
          this.cList=res.data.data.roles
          console.log(this.cList)
          this.tableData = res.data.data.list;
          this.total = Math.ceil(res.data.data.total / 5) * 10;
         
        }
      });
      },
      // 分页跳转
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
    // 删除
    open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

    }
  }
</script>
<style>
.test{
    margin-top: 20px;
}
</style>


