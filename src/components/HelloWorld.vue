<template>
  <div class="hello">
    <el-table :data="sql" style="width:100%">
      <el-table-column prop="userId" label="ID" ></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
    </el-table>
    <br>
    <el-input v-model="input"></el-input>
    <el-button @click="showapi">获取数据库数据</el-button>
    <h3>{{msg1}}</h3>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      sql:[],
      msg1:''
    }
  },
  methods:{
    showapi:function(){
      this.sql = ['']
      this.$http.get("/api/queryAll").then(function(res){
        console.log(res.body[0])
        this.msg1 = res.body[0]
        for(var i=0;i<res.body.length;i++){
          this.sql.push(res.body[i]);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
