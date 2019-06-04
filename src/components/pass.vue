<template>
  <div class="pass">
    <el-form
      :model="pass"
      label-width="90px"
      status-icon
      label-position="left"
      ref="pass"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldpass">
        <el-input v-model="pass.oldpass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input v-model="pass.newpass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="newpass1">
        <el-input v-model="pass.newpass1" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pass')">提交</el-button>
        <el-button @click="resetForm('pass')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value != this.user.pass) {
        callback(new Error("密码错误"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.pass.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: [],
      pass: { oldpass: "", newpass: "", newpass1: "" },

      rules: {
        oldpass: [{ validator: validatePass, trigger: "blur" }],
        newpass: [{ validator: validatePass1, trigger: "blur" }],
        newpass1: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$http
        .post("/api/getUserByName", {
          name: sessionStorage.getItem("user")
        })
        .then(function(res) {
          this.user = res.body;
        });
    },
    submitForm(formName) {
      if (this.pass.oldpass == this.user.pass) {
        if (this.pass.newpass == this.pass.newpass1) {
          this.$http
            .post("/api/reuser", {
              id: this.user.id,
              name: this.user.name,
              pass: this.pass.newpass,
              createtime: this.user.createtime
            })
            .then(
              function(res) {
                if (res.bodyText == "true") {
                  this.init();
                  this.resetForm("pass");
                  this.$message({
                    message: "密码修改成功",
                    type: "success"
                  });
                } else {
                  this.$message.error(res.bodyText);
                }
              },
              function(res) {
                this.$message.error(res.bodyText);
              }
            );
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.pass {
  margin: 10vh auto;
  width: 40%;
}
</style>
