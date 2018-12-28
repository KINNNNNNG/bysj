<template>
  <div class="hello">
    <el-table :data="sql" style="width:100%">
      <el-table-column prop="userId" label="ID" ></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
           <el-button @click.native.prevent="deleRow(scope.$index,sql)"
            type="text"
            size="small">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-input v-model="input"></el-input>
    <el-button @click="showapi">获取数据库数据</el-button>
    <h3>{{msg1}}</h3>
    <div id="main" :style="{width: '100%', height: '500px'}"></div>
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
      this.sql = []
      this.$http.get("/api/queryAll").then(function(res){
        for(var i=0;i<res.body.length;i++){
          this.sql.push(res.body[i]);
        }
      })
      this.$http.get("/api/queryById?userId="+this.input).then(function(res){
        console.log(res.body)
        this.msg1 = res.bodyText
      })
    },
    //画图
    drawPie(){
      var Pie = this.$echarts.init(document.getElementById('main'))
      Pie.setOption({
        title:{
          text:'各类题目数量',
          x:'center'
        },
        tooltip:{
          trigger:'item',
          formatter:"{a}<br/>{b}:{c} ({d}%)"
        },
        legend:{
          orient:'vartical',
          left:'left',
          data:['单选题','填空题','简答题','判断题','综合题']
        },
        series:[
          {
            name:'题目类型',
            type:'pie',
            radius:'55%',
            canter:['50%','60%'],
            data:[
              {value:548,name:'单选题'},
              {value:451,name:'填空题'},
              {value:625,name:'简答题'},
              {value:751,name:'判断题'},
              {value:654,name:'综合题'},
            ],
            itemStyle:{
              emphasis:{
                shadowBlur:10,
                shadowOffsetX:0,
                shadowColor:'rbga(0,0,0,0.5)'
              }
            }
          }
        ]
      })
    },
    deleRow(index,rows){
      console.log(rows[index])
      this.$http.get("/api/deleteById?userId="+rows[index].userId).then(function(res){
        
      }) 
      rows.splice(index,1);
    }
  },
  mounted(){
    this.drawPie();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
