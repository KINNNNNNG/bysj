<template>
  <div class="plsr" id="plsr" style="height:80%">
    <el-row>
      <el-col :span="2">
        <el-table :data="sjtitle" highlight-current-row @row-click="handleCurrentChange">
          <el-table-column property="name" label="考试名称"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="22">
        <div id="tjfz" style="height:80vh;width:100%;margin-left:20px;margin-right:20px"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sjtitle: [],
      data: [],
      xdata: [],
      jgx: 0.0,
      seriesdata: [],
      ksname: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleCurrentChange(val) {
      this.$http.get("/api/getksda?id=" + val.id).then(
        function(res) {
          this.data = res.body;
          if (this.data.length > 0) {
            this.xdata = [];
            this.seriesdata = [];
            this.data.forEach(element => {
              this.xdata.push(element.name);
              this.seriesdata.push(element.fs);
            });
            this.jgx = this.data[0].mf * 0.6;
            this.ksname = val.name;
            console.log(this.data);
            console.log(this.jgx);
            this.draw();
          }
        },
        function(res) {
          this.$message.error(res.bodyText);
        }
      );
    },
    init() {
      this.$http.get("/api/querySjAll").then(
        function(res) {
          this.sjtitle = res.body;
        },
        function(res) {
          this.$message.erro(res.bodyText);
        }
      );
    },
    draw() {
      var echarts = this.$echarts.init(
        document.getElementById("tjfz"),
        "macarons"
      );
      var option = {
        title: {
          text: this.ksname + "成绩"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["成绩"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.xdata
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "成绩",
            type: "bar",
            data: this.seriesdata,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
                emphasis:{
                    label:{
                        show:true,
                        formatter:'{b}:{c}'
                    }
                },
              data: [
                { type: "average", name: "平均值" },
                {
                  name: "及格线",
                  yAxis: this.jgx
                }
              ]
            }
          }
        ]
      };
      echarts.setOption(option);
    }
  }
};
</script>
<style>
</style>

