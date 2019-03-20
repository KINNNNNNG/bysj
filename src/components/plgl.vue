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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="xztSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="xztEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="xztDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="dxtSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="dxtEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="dxtDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="tktSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="tktEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="tktDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="pdtSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="pdtEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="pdtDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="jdtSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="jdtEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="jdtDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-tag v-if="scope.row.uid==1" type="success">通过</el-tag>
              <el-tag v-if="scope.row.uid==0" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.uid==-1" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入题目关键字搜索"/>
              <el-button v-if="SelectionId.length>0" @click="zhtSelectionDelete" type="danger">删除选中</el-button>
            </template>
            <template slot-scope="scope">
              <el-button @click="zhtEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="zhtDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-dialog
        title="选择题修改"
        :visible.sync="xztChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <xzt
          :xzt_value="xzt_value"
          :xzt_xx="xztchangge_xx"
          :xzt_radio="xzt_da"
          :xzt_defaultMsg="xzt_defaultMsg"
          :xzt_id="xzt_id"
          @refresh="tabClick"
        ></xzt>
      </el-dialog>
      <el-dialog
        title="多选题修改"
        :visible.sync="dxtChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <dxt
          :dxt_value="dxt_value"
          :dxt_xx="dxtchangge_xx"
          :dxt_defaultMsg="dxt_defaultMsg"
          :dxt_radio="dxt_da"
          :dxt_id="dxt_id"
        ></dxt>
      </el-dialog>
      <el-dialog
        title="填空题修改"
        :visible.sync="tktChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <tkt
          :tkt_value="tkt_value"
          :tkt_xx="tktchangge_xx"
          :tkt_defaultMsg="tkt_defaultMsg"
          :tkt_id="tkt_id"
        ></tkt>
      </el-dialog>
      <el-dialog
        title="判断题修改"
        :visible.sync="pdtChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <pdt
          :pdt_value="pdt_value"
          :pdt_radio="pdt_da"
          :pdt_defaultMsg="pdt_defaultMsg"
          :pdt_id="pdt_id"
        ></pdt>
      </el-dialog>
      <el-dialog
        title="简答题修改"
        :visible.sync="jdtChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <jdt
          :jdt_value="jdt_value"
          :jdt_da="jdt_da"
          :jdt_defaultMsg="jdt_defaultMsg"
          :jdt_id="jdt_id"
        ></jdt>
      </el-dialog>
      <el-dialog
        title="综合题修改"
        :visible.sync="zhtChange"
        width="80%"
        center
        :before-close="tabClick"
      >
        <zht
          :zht_value="zht_value"
          :zht_all="zht_all"
          :zht_defaultMsg="zht_defaultMsg"
          :zht_id="zht_id"
        ></zht>
      </el-dialog>
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
      xztChange: false,
      xzt_value: "",
      xzt_xx: [],
      xztchangge_xx: [],
      xzt_da: "",
      xzt_defaultMsg: "",
      dxt: [],
      dxt_id: "",
      dxtChange: false,
      dxt_value: "",
      dxt_xx: [],
      dxt_da: [],
      dxt_defaultMsg: "",
      dxtchangge_xx: [],
      tkt: [],
      tktChange: false,
      tkt_value: "",
      tktchangge_xx: [],
      tkt_defaultMsg: "",
      tkt_id: "",
      pdt: [],
      pdtChange: false,
      pdt_value: "",
      pdt_da: "",
      pdt_defaultMsg: "",
      pdt_id: "",
      zht: [],
      zhtChange: false,
      zht_value: "",
      zht_all:[],
      zht_defaultMsg: "",
      zht_id: "",
      jdt: [],
      jdtChange: false,
      jdt_value: "",
      jdt_da: "",
      jdt_defaultMsg: "",
      jdt_id: "",
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
          this.xztChange = false;
        });
      }
      if (this.activeName == "second") {
        this.$http.get("/api/queryDxtAll").then(function(res) {
          this.dxt = res.body;
          this.dxtChange = false;
        });
      }
      if (this.activeName == "thrid") {
        this.$http.get("/api/queryTktAll").then(function(res) {
          this.tkt = res.body;
          this.tktChange = false;
        });
      }
      if (this.activeName == "fourd") {
        this.$http.get("/api/queryPdtAll").then(function(res) {
          this.pdt = res.body;
          this.pdtChange = false;
        });
      }
      if (this.activeName == "fifth") {
        this.$http.get("/api/queryJdtAll").then(function(res) {
          this.jdt = res.body;
          this.jdtChange = false;
        });
      }
      if (this.activeName == "sixth") {
        this.$http.get("/api/queryZhtAll").then(function(res) {
          this.zht = res.body;
          this.zhtChange=false;
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
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deleteXztById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    dxtDelete(index, row) {
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deleteDxtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryDxtAll").then(function(res) {
              this.dxt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    tktDelete(index, row) {
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deleteTktById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryTktAll").then(function(res) {
              this.tkt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    pdtDelete(index, row) {
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deletePdtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryPdtAll").then(function(res) {
              this.pdt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    zhtDelete(index, row) {
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deleteZhtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryZhtAll").then(function(res) {
              this.zht = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    xztSelectionDelete() {
      this.$http
        .post("/api/deleteXztById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryXztAll").then(function(res) {
              this.xzt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    jdtDelete(index, row) {
      this.SelectionId = [];
      this.SelectionId.push(row.id);
      this.$http
        .post("/api/deleteJdtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            console.log(res.bodyText);
          }
        });
    },
    dxtSelectionDelete() {
      this.$http
        .post("/api/deleteDxtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
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
        .post("/api/deleteTktById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
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
        .post("/api/deletePdtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText = "true")) {
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
        .post("/api/deleteZhtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
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
        .post("/api/deleteJdtById", {
          id: this.SelectionId
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$http.get("/api/queryJdtAll").then(function(res) {
              this.jdt = res.body;
            });
          } else {
            console.log(res.body);
          }
        });
    },
    xztEdit(index, row) {
      this.xzt_value = row.nyd;
      this.xztchangge_xx = row.xx;
      this.xzt_da = row.da;
      this.xzt_defaultMsg = row.tigan;
      this.xzt_id = row.id;
      this.$emit("value", this.xzt_value);
      this.$emit("xzt_xx", this.xztchangge_xx);
      this.$emit("xzt_radio", this.xzt_da);
      this.$emit("xzt_defaultMsg", this.xzt_defaultMsg);
      this.$emit("id", this.id);
      this.xztChange = true;
    },
    dxtEdit(index, row) {
      this.dxt_value = row.nyd;
      this.dxtchangge_xx = row.xx;
      this.dxt_da = row.da;
      this.dxt_defaultMsg = row.tigan;
      this.dxt_id = row.id;
      this.$emit("dxt_value", this.dxt_value);
      this.$emit("dxt_xx", this.dxtchangge_xx);
      this.$emit("dxt_radio", this.dxt_da);
      this.$emit("dxt_defaultMsg", this.dxt_defaultMsg);
      this.$emit("dxt_id", this.dxt_id);
      this.dxtChange = true;
    },
    tktEdit(index, row) {
      this.tkt_value = row.nyd;
      this.tktchangge_xx = row.da;
      this.tkt_defaultMsg = row.tigan;
      this.tkt_id = row.id;
      this.$emit("tkt_value", this.tkt_value);
      this.$emit("tkt_xx", this.tktchangge_xx);
      this.$emit("tkt_radio", this.tkt_da);
      this.$emit("tkt_defaultMsg", this.tkt_defaultMsg);
      this.$emit("tkt_id", this.tkt_id);
      this.tktChange = true;
    },
    pdtEdit(index, row) {
      console.log(row);
      this.pdt_value = row.nyd;
      this.pdt_da = row.da;
      this.pdt_defaultMsg = row.tigan;
      this.pdt_id = row.id;
      this.$emit("pdt_value", this.pdt_value);
      this.$emit("pdt_radio", this.pdt_da);
      this.$emit("pdt_defaultMsg", this.pdt_defaultMsg);
      this.$emit("pdt_id", this.pdt_id);
      this.pdtChange = true;
    },
    jdtEdit(index, row) {
      console.log(row);
      this.jdt_value = row.nyd;
      this.jdt_da = row.da;
      this.jdt_defaultMsg = row.tigan;
      this.jdt_id = row.id;
      this.$emit("jdt_value", this.jdt_value);
      this.$emit("jdt_da", this.jdt_da);
      this.$emit("jdt_defaultMsg", this.jdt_defaultMsg);
      this.$emit("jdt_id", this.jdt_id);
      this.jdtChange = true;
    },
    zhtEdit(index, row) {
      console.log(row);
      this.zht_value = row.nyd;
      this.zht_all = row.da;
      this.zht_defaultMsg = row.tigan;
      this.zht_id = row.id;
      this.$emit("zht_value", this.zht_value);
      this.$emit("zht_all", this.zht_all);
      this.$emit("zht_defaultMsg", this.zht_defaultMsg);
      this.$emit("zht_id", this.zht_id);
      this.zhtChange = true;
    }
  }
};
</script>
<style>
</style>


