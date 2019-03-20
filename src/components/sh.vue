<template>
  <div class="plsr" id="plsr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="选择题" name="first">
        <el-table
          :data="xzt.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-html="getXzt_xx(scope.row.xx)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干">
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column prop="da" label="答案" sortable></el-table-column>
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/> 
              <el-button v-if="SelectionId.length>0" @click="xztSelectionOk">启用选中</el-button>
              <el-button v-if="SelectionId.length>0" @click="xztSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="xztEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="xztDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="多选题" name="second">
        <el-table
          :data="dxt.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
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
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="dxtSelectionOk">启用选中</el-button>
              <el-button v-if="SelectionId.length>0" @click="dxtSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="dxtEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="dxtDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="thrid">
        <el-table
          :data="tkt.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-html="getTKt_da(scope.row.da)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干" sortable>
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="tktSelectionOk">启用选中</el-button>

              <el-button v-if="SelectionId.length>0" @click="tktSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="tktEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="tktDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="fourd">
        <el-table
          :data="pdt.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干" sortable>
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column prop="da" label="答案" sortable></el-table-column>
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="pdtSelectionOk">启用选中</el-button>

              <el-button v-if="SelectionId.length>0" @click="pdtSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="pdtEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="pdtDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="简答题" name="fifth">
        <el-table
          :data="jdt.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <span>答案: {{scope.row.da}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干" sortable>
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="jdtSelectionOk">启用选中</el-button>

              <el-button v-if="SelectionId.length>0" @click="jdtSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="jdtEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="jdtDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="综合题" name="sixth">
        <el-table
          :data="zht.filter(data=>!search||data.tigan.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          :default-sort="{prop:'id',oder:'descending'}"
          @selection-change="Selection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-html="getZht_tm(scope.row.da)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column label="题干" sortable>
            <template slot-scope="scope">
              <span v-html="scope.row.tigan"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nyd"
            label="难易度"
            :filters="nyd"
            :filter-method="nydFilter"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <span>{{nydLabel(scope.row.nyd)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="审核状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uid==1" type="success">已启用</el-tag>
              <el-tag v-if="scope.row.uid==0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="zhtSelectionOk">启用选中</el-button>

              <el-button v-if="SelectionId.length>0" @click="zhtSelectionDelete" type="danger">禁用选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="zhtEdit(scope.$index, scope.row)">启用</el-button>
              <el-button type="danger" @click="zhtDelete(scope.$index, scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import xzt from "@/components/tminput/xzt.vue";
import dxt from "@/components/tminput/dxt.vue";
import tkt from "@/components/tminput/tkt.vue";
import pdt from "@/components/tminput/pdt.vue";
import jdt from "@/components/tminput/jdt.vue";
import zht from "@/components/tminput/zht.vue";

export default {
  name: "plgl",
  components: { xzt, dxt, tkt, pdt, jdt, zht },
  data() {
    return {
      activeName: "first",
      search: "",
      nyd: [
        {
          text: "无限制",
          value: "选项1"
        },
        {
          text: "简单",
          value: "选项2"
        },
        {
          text: "中等",
          value: "选项3"
        },
        {
          text: "困难",
          value: "选项4"
        }
      ],
      xzt_id: "",
      xzt: [],
      xzt_uid: "",
      dxt: [],
      dxt_id: "",
      dxt_uid: "",
      tkt: [],
      tkt_uid: "",
      tkt_id: "",
      pdt: [],
      pdt_uid: "",
      pdt_id: "",
      zht: [],
      zht_uid: "",
      zht_id: "",
      jdt: [],
      jdt_uid: "",
      jdt_id: "",
      SelectionUid: [],
      SelectionId: []
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
        });
      }
      if (this.activeName == "second") {
        this.$http.get("/api/queryDxtAll").then(function(res) {
          this.dxt = res.body;
        });
      }
      if (this.activeName == "thrid") {
        this.$http.get("/api/queryTktAll").then(function(res) {
          this.tkt = res.body;
        });
      }
      if (this.activeName == "fourd") {
        this.$http.get("/api/queryPdtAll").then(function(res) {
          this.pdt = res.body;
        });
      }
      if (this.activeName == "fifth") {
        this.$http.get("/api/queryJdtAll").then(function(res) {
          this.jdt = res.body;
        });
      }
      if (this.activeName == "sixth") {
        this.$http.get("/api/queryZhtAll").then(function(res) {
          this.zht = res.body;
        });
      }
    },
    Selection(val) {
      this.SelectionId = [];
      val.forEach(element => {
        this.SelectionId.push(element.id);
      });
      console.log(this.SelectionId);
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
    nydFilter(value, row) {
      return row.nyd === value;
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
    },
    getTKt_da(da) {
      var tkt_da = "";
      var num = 1;
      da.forEach(element => {
        tkt_da += "<p>空格" + num + "答案  :  " + element.text + "</p>";
        num++;
      });
      return tkt_da;
    },
    getZht_tm(da) {
      var zht_tm = "";
      var num = 1;
      da.forEach(element => {
        zht_tm +=
          "<p><b>" +
          num +
          " :  " +
          element.tm +
          "</b></p><p>" +
          element.da +
          "</p>";
        num++;
      });
      return zht_tm;
    },
    xztDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateXztUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    dxtDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateDxtUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryDxtAll").then(function(res) {
              this.dxt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    tktDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateTktUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryTktAll").then(function(res) {
              this.tkt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    pdtDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updatePdtUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryPdtAll").then(function(res) {
              this.pdt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    zhtDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateZhtUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryZhtAll").then(function(res) {
              this.zht = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    jdtDelete(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateJdtUid", {
          id: id,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    xztSelectionDelete() {
      this.$http
        .post("/api/updateXztUid", {
          id: this.SelectionId,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    dxtSelectionDelete() {
      this.$http
        .post("/api/updateDxtUid", {
          id: this.SelectionId,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });

            this.$http.get("/api/queryDxtAll").then(function(res) {
              this.dxt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    tktSelectionDelete() {
      this.$http
        .post("/api/updateTktUid", {
          id: this.SelectionId,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });

            this.$http.get("/api/queryTktAll").then(function(res) {
              this.tkt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    pdtSelectionDelete() {
      this.$http
        .post("/api/updatePdtUid", {
          id: this.SelectionId,
          uid: 0
        })
        .then(function(res) {
          if ((res.bodyText = "true")) {
            this.$message({ message: "禁用成功", type: "success" });

            this.$http.get("/api/queryPdtAll").then(function(res) {
              this.pdt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    zhtSelectionDelete() {
      this.$http
        .post("/api/updateZhtUid", {
          id: this.SelectionId,
          uid: 0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });

            this.$http.get("/api/queryZhtAll").then(function(res) {
              this.zht = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    jdtSelectionDelete() {
      this.$http
        .post("/api/updateJdtUid", {
          id: this.SelectionId,
          uid:0
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "禁用成功", type: "success" });

            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    xztEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateXztUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    dxtEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateDxtUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryDxtAll").then(function(res) {
              this.dxt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    tktEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateTktUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryTktAll").then(function(res) {
              this.tkt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    pdtEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updatePdtUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryPdtAll").then(function(res) {
              this.pdt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    jdtEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateJdtUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    zhtEdit(index, row) {
      var id = [];
      id.push(row.id);
      this.$http
        .post("/api/updateZhtUid", {
          id: id,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryZhtAll").then(function(res) {
              this.zht = res.body;
            });
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    xztSelectionOk() {
      this.$http
        .post("/api/updateXztUid", {
          id: this.SelectionId,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    dxtSelectionOk() {
      this.$http
        .post("/api/updateDxtUid", {
          id: this.SelectionId,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });

            this.$http.get("/api/queryDxtAll").then(function(res) {
              this.dxt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    tktSelectionOk() {
      this.$http
        .post("/api/updateTktUid", {
          id: this.SelectionId,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });

            this.$http.get("/api/queryTktAll").then(function(res) {
              this.tkt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    pdtSelectionOk() {
      this.$http
        .post("/api/updatePdtUid", {
          id: this.SelectionId,
          uid: 1
        })
        .then(function(res) {
          if ((res.bodyText = "true")) {
            this.$message({ message: "启用成功", type: "success" });
            this.$http.get("/api/queryPdtAll").then(function(res) {
              this.pdt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    zhtSelectionOk() {
      this.$http
        .post("/api/updateZhtUid", {
          id: this.SelectionId,
          uid: 1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });

            this.$http.get("/api/queryZhtAll").then(function(res) {
              this.zht = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    jdtSelectionOk() {
      this.$http
        .post("/api/updateJdtUid", {
          id: this.SelectionId,
          uid:1
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "启用成功", type: "success" });

            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    }
  }
};
</script>
<style>
</style>


