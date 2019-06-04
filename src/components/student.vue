<template>
  <div>
    <el-table :data="admin" style="width:100%">
      <el-table-column prop="user" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" slot="header">
          <el-button @click="adduser = true">添加学生</el-button>
        </template>
        <template slot-scope="scope">
          <el-button @click="re(scope.row)">重置密码</el-button>
          <el-button @click="deleteuser(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加管理员" :visible.sync="adduser" center width="30%">
      <div style="margin-top:20px">
        <div style="margin-top:20px">
          <span>姓名</span>
          <el-input style="width:80%" v-model="name"></el-input>
        </div>
        <div style="margin-top:20px">
          <span>账号</span>
          <el-input style="width:80%" v-model="user"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduser = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: [],
      adduser: false,
      user: "",
      name: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$http.get("/api/queryAllStudent").then(
        function(res) {
          this.admin = res.body;
        },
        function(res) {
          this.$message.error(res.bodyText);
        }
      );
    },
    add(scope, index) {
      this.$http
        .post("/api/addStudent", {
          name: this.name,
          pass: 123,
          user: this.user
        })
        .then(
          function(res) {
            if (res.bodyText == "true") {
              this.init();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.adduser = false;
            } else {
              this.$message.error(res.bodyText);
            }
          },
          function(res) {
            this.$message.error(res.bodyText);
          }
        );
    },
    re(row) {
      this.$http
        .post("/api/restudent", {
          id: row.id,
          user: row.user,
          name: row.name,
          pass: 123
        })
        .then(
          function(res) {
            if (res.bodyText == "true") {
              this.$message({
                message: "密码重置成功",
                type: "success"
              });
            }
          },
          function(res) {
            this.$message.error(res.bodyText);
          }
        );
    },
    deleteuser(row) {
      this.$http
        .post("/api/deleteStudent", {
          id: row.id
        })
        .then(
          function(res) {
            if (res.bodyText == "true") {
              this.init();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          },
          function(res) {
            this.$message.error(res.bodyText);
          }
        );
    }
  }
};
</script>
<style>
</style>

