<template>
  <div class="dtsr" id="Dtsr">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="选择题" name="first" >
      
    
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
    <h3>{{defaultMsg}}</h3>
    <div class="editor-container">
        <UE v-model="defaultMsg" :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
    <el-button @click="test1">测试</el-button>
    </el-tab-pane>
    <el-tab-pane label="填空题" name="second">填空题</el-tab-pane>
    <el-tab-pane label="判断题" name="third">判断题</el-tab-pane>
    <el-tab-pane label="简答题" name="fourth">简答题</el-tab-pane>
  </el-tabs>
  </div>
  
</template>

<script>
import UE from '@/components/ue.vue'
export default {
  components:{UE},
  name: 'Dtsr',
  data() {
      return {
        form: {
          name1: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        options: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        value: '',
        id:'',
        name:'',
        xzt_tm,
        activeName:'first'
      }
    },
  methods:{
    test:function(){
      console.log(this.value)
      this.$http.post("/api/saveUser?id="+this.id+"&sex="+this.value+"&name="+this.name).then(function(res){
        console.log(this.value)
      })
    },
    test1(){
      console.log(this.defaultMsg)
    },
    onSubmit(){

    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
