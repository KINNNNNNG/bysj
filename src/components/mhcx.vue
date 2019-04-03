<template>
  <div class="plsr" id="plsr">
    <el-table
      :data="sjtitle"
      style="width: 100%"
      highlight-current-row
      @row-click="handleCurrentChange"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="name" label="考试名称"></el-table-column>
      <el-table-column property="ksxz" label="考试"></el-table-column>
      <el-table-column label="考试类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==1">口令登陆</el-tag>
          <el-tag v-if="scope.row.type == 2">指定考生登陆</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="试卷预览" width="90%" :visible.sync="yl">
      <div v-if="active == 1">
        <div v-if="sj.xzt.length>0">
          <h3>选择题</h3>
          <template v-for="(xzt, index) in sj.xzt">
            <div v-html="addnum(xzt.tigan,index,xzt.fz)" :key="'xzt'+index"></div>
            <el-radio
              v-model="xztda[index].da"
              v-for="(item1, index1) in xzt.xx"
              :key="'xztda'+index+index1"
              :label="dxt_label(index1)"
            >{{dxt_label(index1)}}：{{item1.text}}</el-radio>
          </template>
        </div>
        <div v-if="sj.dxt.length>0">
          <h3>多选题</h3>
          <template v-for="(dxt, index) in sj.dxt">
            <div v-html="addnum(dxt.tigan,index,dxt.fz)" :key="'dxt'+index"></div>
            <el-checkbox-group v-model="dxtda[index].da" :key="index">
              <el-checkbox
                v-for="(item, index1) in dxt.xx"
                :label="dxt_label(index1)"
                :key="'dxtda'+index+index1"
              >{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
        <div v-if="sj.tkt.length>0">
          <h3>填空题</h3>
          <template v-for="(tkt, index) in sj.tkt">
            <div v-html="tktcontent(tkt,index,tkt.fz)" :key="'tkt'+index"></div>
            <el-input
              v-for="(item, index1) in tkt.da"
              :key="'tktda'+index+index1"
              v-model="tktda[index].da[index1].da"
              style="width:150px;margin-right:20px"
              :placeholder="tktdatext(index1)"
            ></el-input>
          </template>
        </div>
        <div v-if="sj.pdt.length>0">
          <h3>判断题</h3>
          <template v-for="(pdt, index) in sj.pdt">
            <div v-html="addnum(pdt.tigan,index,pdt.fz)" :key="'pdt'+index"></div>
            <el-radio v-model="pdtda[index]" label="对" :key="'pdtda0'+index">对</el-radio>
            <el-radio v-model="pdtda[index]" label="错" :key="'pdtda1'+index">错</el-radio>
          </template>
        </div>
        <div v-if="sj.jdt.length>0">
          <h3>简答题</h3>
          <template v-for="(jdt, index) in sj.jdt">
            <div v-html="addnum(jdt.tigan,index,jdt.fz)" :key="'jdt'+index"></div>
            <el-input autosize type="textarea" v-model="jdtda[index].da" :key="'jdtda'+index"></el-input>
          </template>
        </div>
        <div v-if="sj.zht.length>0">
          <h3>综合题</h3>
          <template v-for="(zht, index) in sj.zht">
            <div v-html="addnum(zht.tigan,index,zht.fz)" :key="'zht'+index"></div>
            <template v-for="(item, index1) in zht.da">
              <div style="margin:10px" v-html="item.tm" :key="'zhttm'+index+index1"></div>
              <el-input
                autosize
                type="textarea"
                v-model="zhtda[index].da[index1].da"
                :key="'zhtda'+index+index1"
              ></el-input>
            </template>
          </template>
        </div>
      </div>
      <div style="text-align:center">
        <el-button type="danger" @click="Delete">删除此场考试</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sjID: "",
      sjtitle: [],
      sj: [],
      xztda: [],
      dxtda: [],
      tktda: [],
      pdtda: [],
      jdtda: [],
      zhtda: [],
      yl: false,
      active: 0
    };
  },
  mounted() {
    this.init();
    this.sjinit();
  },
  methods: {
    Delete() {
      this.$http.post("/api/sjDeleteById?id=" + this.sjID).then(function(res) {
        if (res.bodyText == "ture") {
          this.init();
          this.yl = false;
        }
      });
    },
    handleCurrentChange(val) {
      this.sjID = val.id;
      this.sjinit();
      this.active = 1;
      this.yl = true;
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
    tktdatext(index) {
      var temp = index + 1;
      return "请填写第" + temp + "个空格答案";
    },
    addnum(tigan, index, fz) {
      index = index + 1;
      return (
        tigan.slice(0, 3) + index + "：" + "(" + fz + "分)" + tigan.slice(3)
      );
    },
    tktcontent(tkt, index, fz) {
      var tigan = this.addnum(tkt.tigan, index, fz);
      for (var i = 0; i < tkt.da.length; i++) {
        var temp = i + 1;
        var re = "(__" + temp + "__)";
        tigan = tigan.replace("(___)", re);
      }
      return "<div>" + tigan + "</div>";
    },
    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    sjinit() {
      this.$http.post("/api/getSjContent?ID=" + this.sjID).then(function(res) {
        this.sj = res.body;
        console.log(this.sj);
        this.sj.xzt.forEach(element => {
          this.xztda.push({
            id: element.id,
            da: "",
            fz: element.fz
          });
        });
        this.sj.dxt.forEach(element => {
          this.dxtda.push({
            id: element.id,
            da: [],
            fz: element.fz
          });
        });
        for (var i = 0; i < this.sj.tkt.length; i++) {
          this.tktda.push({
            id: this.sj.tkt[i].id,
            fz: this.sj.tkt[i].fz,
            da: []
          });
          for (var j = 0; j < this.sj.tkt[i].da.length; j++) {
            this.tktda[i].da.push({
              kg: j,
              da: ""
            });
          }
        }
        this.sj.pdt.forEach(element => {
          this.pdtda.push({
            id: element.id,
            da: "",
            fz: element.fz
          });
        });
        this.sj.jdt.forEach(element => {
          this.jdtda.push({
            id: element.id,
            da: "",
            fz: element.fz
          });
        });
        for (var i = 0; i < this.sj.zht.length; i++) {
          this.zhtda.push({
            id: this.sj.zht[i].id,
            fz: this.sj.zht[i].fz,
            da: []
          });
          for (var j = 0; j < this.sj.zht[i].da.length; j++) {
            this.zhtda[i].da.push({
              tm: j,
              da: ""
            });
          }
        }
        this.allfz = this.sj.allfz;
      });
    }
  }
};
</script>
<style>
</style>


