<template>
  <div class="dtsr" id="Dtsr">
    <el-row>
    <el-col :span="6"><el-input v-model="id" placeholder="ID"></el-input></el-col>
    <el-col :span="6"><el-input v-model="name" placeholder="姓名"></el-input></el-col>
    <el-col :span="6">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-button @click="test">保存数据</el-button>
    </el-col>
  </el-row>
    
  </div>
</template>

<script>

export default {
  name: 'Dtsr',
  data() {
      return {
        options: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        value: '',
        id:'',
        name:''
      }
    },
  methods:{
    test:function(){
      console.log(this.value)
      this.$http.post("/api/saveUser?id="+this.id+"&sex="+this.value+"&name="+this.name).then(function(res){
        console.log(this.value)
      })
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
