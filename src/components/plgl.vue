<template>
  <div class="plsr" id="plsr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="选择题" name="first">
        <el-table :data="xzt" style="width:100%" :default-sort="{prop:'id',oder:'descending'}">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-html="getXzt_xx(scope.row.xx)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干" sortable>
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column prop="da" label="答案" sortable></el-table-column>
          <el-table-column prop="fz" label="分值" sortable></el-table-column>
          <el-table-column label="难易度" sortable>
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="多选题" name="second"></el-tab-pane>
      <el-tab-pane label="填空题" name="thrid"></el-tab-pane>
      <el-tab-pane label="判断题" name="fourd"></el-tab-pane>
      <el-tab-pane label="简答题" name="fifth"></el-tab-pane>
      <el-tab-pane label="综合题" name="sixth"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "plgl",
  data() {
    return {
      activeName: "first",
      xzt: [],
      xzt_xx: []
    };
  },
  mounted() {
    this.tabClick();
  },
  methods: {
    tabClick(tab, event) {
      if (this.activeName == "first") {
        this.$http.get("/api/queryXztAll").then(function(res) {
          this.xzt = res.body;
          res.body.forEach(temp => {});
        });
      }
    },
    nydLabel(nyd) {
      if (nyd == "选项1") {
        return "无限制";
      }
      if (nyd == "选项2") {
        return "简单";
      }
      if (nyd == "选项3") {
        return "中等";
      }
      if (nyd == "选项4") {
        return "困难";
      }
    },
    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    getXzt_xx(xx) {
      var xzt_xx = "";
      var num = 0;
      xx.forEach(element => {
        xzt_xx += "<p>" + this.dxt_label(num) + "  :  " + element.text + "</p>";
        num++;
      });
      return xzt_xx;
    }
  }
};
</script>
<style>
</style>


