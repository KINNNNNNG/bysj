<template>
  <div class="dtsr" id="dtsr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="选择题" name="first">
        <el-form ref="xzt" :model="xzt" label-position="right">
          <h4>选择题题干</h4>
          <UE
            v-model="xzt_defaultMsg"
            :id="xzt_UE"
            :writeMsg="xzt_defaultMsg"
            :config="xzt_config"
            ref="xzt_ue"
          ></UE>
          <el-form-item
            v-for="(xx,index) in xzt.xzt_xx"
            :label="xzt_label(index)"
            :prop="'xzt_xx.'+index+'.text'"
            :key="xx.label"
            :rules="{required:true,message:'选项不能为空',trigger:'blur'}"
          >
            <el-row type="flex" justify="space-around">
              <el-col :span="22">
                <el-input v-model="xx.text" type="textarea" autosize clearable></el-input>
              </el-col>
              <el-col :span="1">
                <el-button @click.prevent="removeXzt(xx)" type="danger" icon="el-icon-delete"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="答案">
            <el-radio
              v-for="(xx,index) in xzt.xzt_xx"
              v-model="xzt_radio"
              :label="xzt_label(index)"
              :key="index"
            >{{xzt_label(index)}}</el-radio>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xzt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="xzt_add">添加选项</el-button>
            <el-button @click="xzt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="多选题" name="second">
        <el-form ref="dxt" :model="dxt" label-position="right">
          <h4>多选题题干</h4>
          <UE
            v-model="dxt_defaultMsg"
            :id="dxt_UE"
            :writeMsg="dxt_defaultMsg"
            :config="dxt_config"
            ref="dxt_ue"
          ></UE>
          <el-form-item
            v-for="(xx,index) in dxt.dxt_xx"
            :label="dxt_label(index)"
            :prop="'dxt_xx.'+index+'.text'"
            :key="xx.label"
            :rules="{required:true,message:'选项不能为空',trigger:'blur'}"
          >
            <el-row type="flex" justify="space-around">
              <el-col :span="22">
                <el-input v-model="xx.text" type="textarea" autosize clearable></el-input>
              </el-col>
              <el-col :span="1">
                <el-button @click.prevent="removeDxt(xx)" type="danger" icon="el-icon-delete"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="答案">
            <el-checkbox
              v-for="(xx,index) in dxt.dxt_xx"
              v-model="dxt_radio"
              :label="dxt_label(index)"
              :key="index"
            >{{dxt_label(index)}}</el-checkbox>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dxt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="dxt_add">添加选项</el-button>
            <el-button @click="dxt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="thrid">
        <el-form ref="tkt" :model="tkt" label-position="right">
          <h4>填空题题干</h4>
          <UE
            v-model="tkt_defaultMsg"
            :writeMsg="tkt_defaultMsg"
            :config="tkt_config"
            :id="tkt_UE"
            ref="tkt_ue"
          ></UE>
          <el-form-item
            v-for="(xx,index) in tkt.tkt_xx"
            :key="index"
            :prop="'tkt_xx.'+index+'.text'"
            :label="'填空'+index"
            :rules="{required:true,message:'填空答案不能为空',trigger:'blur'}"
          >
            <el-row type="flex" justify="space-around">
              <el-col :span="22">
                <el-input
                  v-model="xx.text"
                  type="textarea"
                  autosize
                  clearable
                  placeholder="多个答案请用逗号（，）分隔"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <el-button @click.prevent="removeTkt(xx)" type="danger" icon="el-icon-delete"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="tkt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="tkt_add">添加空格</el-button>
            <el-button @click="tkt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="fourd">
        <el-form ref="tkt" :model="tkt" label-position="right">
          <h4>判断题题干</h4>
          <UE
            v-model="pdt_defaultMsg"
            :writeMsg="pdt_defaultMsg"
            :config="pdt_config"
            :id="pdt_UE"
            ref="pdt_ue"
          ></UE>
          <el-form-item>
            <el-radio-group v-model="pdt_radio">
              <el-radio-button label="对"></el-radio-button>
              <el-radio-button label="错"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pdt_submit">提交</el-button>
            <el-button @click="pdt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="简答题" name="fifth">
        <el-form ref="tkt" :model="tkt" label-position="right">
          <h4>简答题题干</h4>

          <UE
            v-model="jdt_defaultMsg"
            :writeMsg="jdt_defaultMsg"
            :config="jdt_config"
            :id="jdt_UE"
            ref="jdt_ue"
          ></UE>

          <el-form-item>
            <el-input type="textarea" autosize placeholder="请输入简答题答案" v-model="jdt_da"></el-input>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="jdt_submit">提交</el-button>
            <el-button @click="jdt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="综合题" name="sixth">
        <h4>综合题题干</h4>
        <el-form
          :rules="{tm:[{required:true,message:'不能为空',trigger:'blur'}],da:[{required:true,message:'不能为空',trigger:'blur'}]}"
        >
          <UE
            v-model="zht_defaultMsg"
            :writeMsg="zht_defaultMsg"
            :config="zht_config"
            :id="zht_UE"
            ref="zht_ue"
          ></UE>
          <el-form-item v-for="(tm,index) in zht" :prop="'zht.'+index+'.tm'" :key="index">
            <el-input autosize placeholder="请输入综合题题目" v-model="tm.tm"></el-input>
            <el-input type="textarea" autosize placeholder="请输入综合题答案" v-model="tm.da"></el-input>
          </el-form-item>
          <el-form-item label="难易度:">
            <el-select v-model="value">
              <el-option
                v-for="item in nyd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="zht_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="zht_add">添加小题</el-button>
            <el-button @click="zht_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="预览" :visible.sync="xzt_Dialog" width="30%" center>
      <span v-html="xzt_defaultMsg"></span>
      <span v-for="(xx,index) in xzt.xzt_xx" :key="index">
        <el-row type="flex" justify="space-around">
          <el-col :span="1">
            <div>{{xzt_label(index)}}</div>
          </el-col>
          <el-col :span="22">
            <div>{{xx.text}}</div>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="dxt_Dialog" width="30%" center>
      <span v-html="dxt_defaultMsg"></span>
      <span v-for="(xx,index) in dxt.dxt_xx" :key="index">
        <el-row type="flex" justify="space-around">
          <el-col :span="1">
            <div>{{dxt_label(index)}}</div>
          </el-col>
          <el-col :span="22">
            <div>{{xx.text}}</div>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="tkt_Dialog" width="30%" center>
      <span v-html="tkt_defaultMsg"></span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="pdt_Dialog" width="30%" center>
      <span v-html="pdt_defaultMsg"></span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="jdt_Dialog" width="30%" center>
      <span v-html="jdt_defaultMsg"></span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="zht_Dialog" width="30%" center>
      <span v-html="zht_defaultMsg"></span>
      <span v-for="(tm,index) in zht" :key="index">
        <el-row type="flex" justify="space-around">
          <el-col :span="22">
            <div>{{tm.tm}}</div>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog title="提交" :visible.sync="submit_Dialog" width="30%" center>
      <span>{{submit_log}}</span>
    </el-dialog>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
  components: { UE },
  name: "Dtsr",
  data() {
    return {
      submit_Dialog: false,
      submit_log: "",
      activeName: "first",
      value: "选项1",
      nyd: [
        {
          value: "选项1",
          label: "无限制"
        },
        {
          value: "选项2",
          label: "简单"
        },
        {
          value: "选项3",
          label: "中等"
        },
        {
          value: "选项4",
          label: "困难"
        }
      ],

      xzt_UE: "xzt_UE",
      xzt: {
        name: "",
        tm: "",
        xzt_xx: [
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          }
        ]
      },
      num: 65,
      xzt_defaultMsg: "",
      xzt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      xzt_Dialog: false,
      xzt_radio: "A",

      dxt_UE: "dxt_UE",
      dxt: {
        name: "",
        tm: "",
        dxt_xx: [
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          }
        ]
      },
      dxt_num: 65,
      dxt_defaultMsg: "",
      dxt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      dxt_Dialog: false,
      dxt_radio: [],

      tkt_defaultMsg: "",
      tkt_Dialog: false,
      tkt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      tkt_UE: "tkt_UE",
      tkt: {
        name: "",
        tkt_xx: []
      },
      pdt_defaultMsg: "",
      pdt_Dialog: false,
      pdt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      pdt_UE: "pdt_UE",
      pdt_radio: "对",

      jdt_UE: "jdt_UE",
      jdt_defaultMsg: "",
      jdt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      jdt_da: "",
      jdt_Dialog: false,

      zht_UE: "zht_UE",
      zht_defaultMsg: "",
      zht_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      zht: [
        {
          tm: "",
          da: ""
        }
      ],
      zht_Dialog: false
    };
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
    },
    xzt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    xzt_add() {
      this.xzt.xzt_xx.push({
        text: "",
        key: Date.now()
      });
      this.num++;
    },
    removeXzt(item) {
      var index = this.xzt.xzt_xx.indexOf(item);
      if (index !== -1) {
        console.log(index);
        this.num--;
        this.xzt.xzt_xx.splice(index, 1);
      }
      console.log(this.xzt.xzt_xx);
    },
    xzt_submit() {
      this.$http
        .post("/api/xzt", {
          tigan: this.$refs.xzt_ue.getUEContent(),
          xx: this.xzt.xzt_xx,
          da: this.xzt_radio,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.xzt.resetFields();
            this.$refs.xzt_ue.setUEContent("");
            this.value = "";
          } else {
            this.submit_log = res.body;
            this.submit_Dialog = true;
          }
        });
    },
    xzt_dialogVisible() {
      this.xzt_defaultMsg = this.$refs.xzt_ue.getUEContent();
      console.log(this.$refs.xzt_ue.getUEContent());
      this.xzt_Dialog = true;
    },

    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    dxt_add() {
      this.dxt.dxt_xx.push({
        text: "",
        key: Date.now()
      });
      this.dxt_num++;
    },
    removeDxt(item) {
      var index = this.dxt.dxt_xx.indexOf(item);
      if (index !== -1) {
        console.log(index);
        this.dxt_num--;
        this.dxt.dxt_xx.splice(index, 1);
      }
      console.log(this.dxt.dxt_xx);
    },
    dxt_submit() {
      this.$http
        .post("/api/dxt", {
          tigan: this.$refs.dxt_ue.getUEContent(),
          xx: this.dxt.dxt_xx,
          da: this.dxt_radio,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.dxt.resetFields();
            this.$refs.dxt_ue.setUEContent("");
            this.dxt_radio = [];
            this.value = "";
          } else {
            this.submit_log = res.body;
            this.submit_Dialog = true;
          }
        });
    },
    dxt_dialogVisible() {
      this.dxt_defaultMsg = this.$refs.dxt_ue.getUEContent();
      console.log(this.$refs.dxt_ue.getUEContent());
      this.dxt_Dialog = true;
    },
    tkt_submit() {
      this.$http
        .post("/api/tkt", {
          tigan: this.$refs.tkt_ue.getUEContent(),
          da: this.tkt.tkt_xx,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.tkt.resetFields();
            this.$refs.tkt_ue.setUEContent("");
            this.tkt.tkt_xx = [];
            this.value = "";
          } else {
            this.submit_log = res.body;
            this.submit_Dialog = true;
          }
        });
      console.log(this.$refs.tkt_ue.getUEContent());
    },
    tkt_add() {
      this.tkt.tkt_xx.push({
        text: ""
      });
      this.$refs.tkt_ue.insertHtml("(______)");
      console.log(this.$refs.tkt_ue.getUEContent());
    },
    tkt_dialogVisible() {
      this.tkt_defaultMsg = this.$refs.tkt_ue.getUEContent();
      this.tkt_Dialog = true;
    },
    removeTkt(item) {
      var index = this.tkt.tkt_xx.indexOf(item);
      if (index !== -1) {
        this.tkt.tkt_xx.splice(index, 1);
      }
    },
    pdt_submit() {
      this.$http
        .post("/api/pdt", {
          tigan: this.$refs.pdt_ue.getUEContent(),
          da: this.pdt_radio,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.pdt.resetFields();
            this.$refs.pdt_ue.setUEContent("");
            this.value = "";
          } else {
            this.submit_log = "提交失败";
            this.submit_Dialog = true;
          }
        });
    },
    pdt_dialogVisible() {
      this.pdt_defaultMsg = this.$refs.pdt_ue.getUEContent();
      this.pdt_Dialog = true;
      console.log(this.pdt_defaultMsg);
      console.log(this.$refs.pdt_ue.getUEContent());
    },
    jdt_submit() {
      this.$http
        .post("/api/jdt", {
          tigan: this.$refs.jdt_ue.getUEContent(),
          da: this.jdt_da,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.jdt_ue.setUEContent("");
            this.jdt_da = "";
            this.value = "";
          } else {
            this.submit_log = res.body;
            this.submit_Dialog = true;
          }
        });
    },
    jdt_dialogVisible() {
      this.jdt_defaultMsg = this.$refs.jdt_ue.getUEContent();
      this.jdt_Dialog = true;
      console.log(this.jdt_defaultMsg);
      console.log(this.$refs.jdt_ue.getUEContent());
    },
    zht_submit() {
      this.$http
        .post("/api/zht", {
          tigan: this.$refs.zht_ue.getUEContent(),
          da: this.zht,
          nyd: this.value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.submit_log = "提交成功";
            this.submit_Dialog = true;
            this.$refs.zht_ue.setUEContent("");
            this.zht = [{ tm: "", da: "" }];
            this.value = "";
          } else {
            this.submit_log = "提交失败";
            this.submit_Dialog = true;
          }
        });
    },
    zht_dialogVisible() {
      this.zht_defaultMsg = this.$refs.zht_ue.getUEContent();
      this.zht_Dialog = true;
    },
    zht_add() {
      this.zht.push({
        tm: "",
        da: ""
      });
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.ueditor {
  margin-bottom: 20px;
}
h4 {
  text-align: center;
}
</style>