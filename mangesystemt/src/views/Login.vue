<template>
<div class="big-box">
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <div class="login_header">
                    <img src="/img/logo.6f4321c1.png" alt="">
                </div>
            </div>
        </el-col>
    </el-row>

    <el-container class="l-contain">
        <div class="form-box">
            <h1>用户登录</h1>
            <el-form status-icon :model="form" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input placeholder="输入用户名" prefix-icon="el-icon-user"  v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" type="password" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="onSubmit('loginForm')">用户登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-container>


</div>
</template>

<script>
import { getLogin } from "../api/common";


export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { len: 5, message: "长度为5位 ", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          getLogin(this.form).then(res => {
              
            if (!res.data.status) {
                localStorage.setItem('username',res.data.data.username);
              this.$router.push("/home/index");
            }
          });
        } else {
          this.$message("表单输入有误!!!!!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
.big-box {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat; //不重复
  background-size: 100% 100%; // 满屏
  background-image: url(/img/bcphoto.407054bc.jpg);
}
.form-box h1 {
  margin: 0 0 20px;
}

.l-contain {
  height: 100%;
}

.form-box {
  width: 400px;
  height: 300px;
  margin: 90px auto;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: hsla(0, 0%, 100%, 0.5);
  border-radius: 5px;
}

.form-box button {
  width: 100%;
}

.grid-content {
  height: 80px;
  background-color: hsla(0, 0%, 100%, 0.2);
}

.login_header {
  width: 300px;
  height: 80px;
  margin: auto;
}

.login_header img {
  width: 100%;
  height: 100%;
}
</style>