<template>
  <div id="app">
    <el-container>
      <el-header id="app-header">
        <h1>特殊题库管理系统</h1>
      </el-header>
      <el-container v-if="login==1">
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <span>首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>题目输入</span>
              </template>
              <el-menu-item index="2-1">
                <router-link to="/dtsr"></router-link>单题输入
              </el-menu-item>
              <el-menu-item index="2-2">批量导入</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">题目管理</template>
              <el-menu-item index="3-1">审核</el-menu-item>
              <el-menu-item index="3-2">组卷</el-menu-item>
              <el-menu-item index="3-3">批量管理</el-menu-item>
              <el-menu-item index="3-4">试卷管理</el-menu-item>
              <el-menu-item index="3-5">统计分析</el-menu-item>
              <!-- <el-menu-item index="3-6">测试页面</el-menu-item> -->
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">账号管理</template>
              <el-menu-item index="4-3">密码修改</el-menu-item>
              <el-menu-item index="4-1">考生账号管理</el-menu-item>
              <el-menu-item index="4-2" v-if="user=='admin'">题库管理员账号管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="height:100%">
          <router-view/>
        </el-main>
      </el-container>
      <el-main v-if="login==0" class="login">
        <el-row type="flex" :span="24" justify="space-around">
          <el-col :span="8">
            <el-card shadow="always">
              <div class="logintext">
                <h3>登陆</h3>
              </div>
              <div class="logintext">
                <div class="logininput">
                  <el-input placeholder="请输入账号" v-model="user">
                    <template slot="prepend">账号:</template>
                  </el-input>
                </div>
              </div>
              <div class="logintext">
                <el-input v-model="pass" placeholder="请输入密码" type="password">
                  <template slot="prepend">密码:</template>
                </el-input>
              </div>
              <div class="logintext">
                <el-button type="primary" @click="loginclick">登陆</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
      login: "",
      user: "",
      pass: ""
    };
  },
  mounted() {
    this.getsession();
  },
  methods: {
    getsession() {
      this.user = sessionStorage.getItem("user");
      this.login = sessionStorage.getItem("login");
      if (this.login == null) {
        this.login = 0;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "1") {
        this.$router.push("/");
      }
      if (key == "2-1") {
        this.$router.push("/dtsr");
      }
      if (key == "2-2") {
        this.$router.push("/plsr");
      }
      if (key == "3-1") {
        this.$router.push("/sh");
      }
      if (key == "3-2") {
        this.$router.push("/gx");
      }
      if (key == "3-3") {
        this.$router.push("/plgl");
      }
      if (key == "3-4") {
        this.$router.push("/mhcx");
      }
      if (key == "3-5") {
        this.$router.push("/tjfx");
      }
      if (key == "3-6") {
        this.$router.push("/test");
      }
      if (key == "4-1") {
        this.$router.push("/student");
      }
      if (key == "4-2") {
        this.$router.push("/admin");
      }
      if (key == "4-3") {
        this.$router.push("/pass");
      }
    },
    loginclick() {
      this.$http
        .post("/api/login", {
          name: this.user,
          pass: this.pass
        })
        .then(function(res) {
          console.log(res);
          if (res.bodyText == "true") {
            this.login = 1;
            sessionStorage.setItem("user", this.user);
            sessionStorage.setItem("login", this.login);
            this.$message({ message: "登陆成功", type: "success" });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app-header {
  text-align: center;
}
.login {
  text-align: center;
}
.logintext {
  margin: 30px;
}
</style>
