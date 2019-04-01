<template>
  <div>
    <div v-if="sj.xzt.length>0">
      <h3>选择题</h3>
      <template v-for="(xzt, index) in sj.xzt">
        <div v-html="addnum(xzt.tigan,index)" :key="'xzt'+index"></div>
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
        <div v-html="addnum(dxt.tigan,index)" :key="'dxt'+index"></div>
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
        <div v-html="tktcontent(tkt,index)" :key="'tkt'+index"></div>
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
        <div v-html="addnum(pdt.tigan,index)" :key="'pdt'+index"></div>
        <el-radio v-model="pdtda[index]" label="对" :key="'pdtda0'+index">对</el-radio>
        <el-radio v-model="pdtda[index]" label="错" :key="'pdtda1'+index">错</el-radio>
      </template>
    </div>
    <div v-if="sj.jdt.length>0">
      <h3>简答题</h3>
      <template v-for="(jdt, index) in sj.jdt">
        <div v-html="addnum(jdt.tigan,index)" :key="'jdt'+index"></div>
        <el-input autosize type="textarea" v-model="jdtda[index].da" :key="'jdtda'+index"></el-input>
      </template>
    </div>
    <div v-if="sj.zht.length>0">
      <h3>综合题</h3>
      <template v-for="(zht, index) in sj.zht">
        <div v-html="addnum(zht.tigan,index)" :key="'zht'+index"></div>
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
</template>

<script>
export default {
  data() {
    return {
      sjID: 0,
      sj: [],
      xztda: [],
      dxtda: [],
      tktda: [],
      pdtda: [],
      jdtda: [],
      zhtda: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    tktdatext(index) {
      var temp = index + 1;
      return "请填写第" + temp + "个空格答案";
    },
    addnum(tigan, index) {
      index = index + 1;
      return tigan.slice(0, 3) + index + "：" + tigan.slice(3);
    },
    tktcontent(tkt, index) {
      var tigan = this.addnum(tkt.tigan, index);
      for (var i = 0; i < tkt.da.length; i++) {
        var temp = i + 1;
        var re = "(__" + temp + "__)";
        tigan = tigan.replace("(___)", re);
        console.log(tigan);
      }
      return "<div>" + tigan + "</div>";
    },
    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    init() {
      this.sjID = 1;
      this.$http.post("/api/getSjContent?ID=" + this.sjID).then(function(res) {
        this.sj = res.body;
        console.log(this.sj);
        this.sj.xzt.forEach(element => {
          this.xztda.push({
            id: element.id,
            da: ""
          });
        });
        this.sj.dxt.forEach(element => {
          this.dxtda.push({
            id: element.id,
            da: []
          });
        });
        for (var i = 0; i < this.sj.tkt.length; i++) {
          this.tktda.push({
            da: []
          });
          for (var j = 0; j < this.sj.tkt[i].da.length; j++) {
            this.tktda[i].da.push({
              id: this.sj.tkt[i].id,
              kg: j,
              da: ""
            });
          }
        }
        this.sj.pdt.forEach(element => {
          this.pdtda.push({
            id: element.id,
            da: ""
          });
        });
        this.sj.jdt.forEach(element => {
          this.jdtda.push({
            id: element.id,
            da: ""
          });
        });
        for (var i = 0; i < this.sj.zht.length; i++) {
          this.zhtda.push({
            da: []
          });
          for (var j = 0; j < this.sj.zht[i].da.length; j++) {
            this.zhtda[i].da.push({
              id: this.sj.zht[i].id,
              tm: j,
              da: ""
            });
          }
        }
        this.active++;
        console.log(this.sj);
        console.log(this.tktda);
      });
    }
  }
};
</script>

<style>
</style>
