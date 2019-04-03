<template>
  <div class="hello" style="height:80%">
    <h3>{{msg1}}</h3>
    <div id="main" style="height:80vh;width:100%"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      AllTmNum: [],
      xzt: 0,
      msg1: "",
      data: []
    };
  },
  methods: {
    showapi: function() {
      this.sql = [];
      this.$http.get("/api/queryAll").then(function(res) {
        for (var i = 0; i < res.body.length; i++) {
          this.sql.push(res.body[i]);
        }
      });
      this.$http.get("/api/queryById?userId=" + this.input).then(function(res) {
        console.log(res.body);
        this.msg1 = res.bodyText;
      });
    },
    init() {
      this.$http.get("/api/TmNum").then(
        function(res) {
          console.log(res.body.xzt);
          this.xzt = res.body.xzt;
          this.AllTmNum = res.body;
          this.data = [
            { value: res.body.xzt, name: "选择题" },
            { value: this.AllTmNum.dxt, name: "多选题" },
            { value: this.AllTmNum.tkt, name: "填空题" },
            { value: this.AllTmNum.pdt, name: "判断题" },
            { value: this.AllTmNum.jdt, name: "简答题" },
            { value: this.AllTmNum.zht, name: "综合题" }
          ];
          console.log(this.data);
          this.drawPie();
        },
        function(res) {
          this.$message.error(res.bodyText);
        }
      );
    },
    //画图
    drawPie() {
      var Pie = this.$echarts.init(document.getElementById("main"), "macarons");
      var option = {
        title: {
          text: "各类题目数量",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        grid: {
          left: "100px"
        },
        legend: {
          orient: "vartical",
          left: "left",
          data: ["选择题", "多选题", "填空题", "判断题", "简答题", "综合题"]
        },
        series: [
          {
            name: "题目类型",
            type: "pie",
            radius: "55%",
            canter: ["50%", "60%"],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rbga(0,0,0,0.5)"
              }
            },
            label: {
              normal: {
                formatter: "{b}:{c}({d}%)",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15
                }
              }
            }
          }
        ]
      };
      Pie.setOption(option);
    },
    deleRow(index, rows) {
      console.log(rows[index]);
      this.$http
        .get("/api/deleteById?userId=" + rows[index].userId)
        .then(function(res) {});
      rows.splice(index, 1);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
