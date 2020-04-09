<template>

    <div class="big-box1">
    
    <el-container style="height: 100%">
  <el-aside width="200px" height="100%"  style="background-color: #2b2e33">
   <el-row class="tac">
      <el-col :span="24">
    <div class="login"><img src="/img/logo.6f4321c1.png" alt="logo"></div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2b2e33"
      text-color="#fff"
      text-left="90px"
      active-text-color="#ffd04b">

       <el-menu-item index="2" @click="handindex">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

       <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="handcategory"><i class="el-icon-user"></i>品类管理</el-menu-item>
          <el-menu-item index="1-2"  @click="handcommodity"><i class="el-icon-shopping-cart-2"></i>商品管理</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="handuser"><i class="el-icon-s-custom"></i>用户管理</el-menu-item>
          <el-menu-item index="3-2" @click="handjurisdiction"><i class="el-icon-setting"></i>权限管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-platform-eleme"></i>
          <span>订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="handorder"><i class="el-icon-phone-outline"></i>订单管理</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
  </el-col>
   </el-row>
  </el-aside>
  
  <el-container>

    <el-header class="header-box">
  <template>
<el-row type="flex"  justify="end" align="middle">
  <el-col  :span="5" :push="1" type="flex"  justify="space-between"  >
    <div class="grid-login" >
   <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
   <div class="grid-login" ><span>admin</span><el-col :push="1" style="color:#ccc">|</el-col></div>
    <div class="grid-login" ><el-col :push="2">  <el-button  size="small"  @click="open">退出登录</el-button></el-col></div>
    </el-col>
</el-row>
</template>
    </el-header>
    <!-- 内容区 -->
    <el-main class="main-box">
        <div   class="main-centin">
          <router-view></router-view>
        </div>
     
      
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<style>
.big-box1 {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  text-align: right;
  font-size: 13px;
  -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.el-aside {
  color: #333;
}
.login {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login img {
  width: 160px;
  height: 40px;
}
.main-box {
  background-color: #f3f3f3;
  color: #333;
  height: 500px;
}
.main-centin {
  /* width: 200px;
  height: 800px; */
  height: 800px;
  background: white;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.grid-login {
  height: 60px;
  width: 22%;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  float: left;
  display: flex;
  align-items: center;
}
.grid-login button {
  border: none;
  color: #409eff;
  background: white;
}
</style>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handcategory(){
       this.$router.push("/home/category")
    },
    handindex(){
      this.$router.push('index')
    },
    handcommodity(){
      this.$router.push('/home/product')
    },
    handjurisdiction(){
      this.$router.push('/home/jurisdiction')
    },
    handuser(){
      this.$router.push('/home/user')
    },
     handorder(){
      this.$router.push('/home/order')
    },
     // 退出登录
    open() {
        this.$confirm('确定要退出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已退出!',
  
  
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      }

    
  }
};
</script>