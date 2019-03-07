<template>
  <div class="dtsr" id="dtsr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="选择题" name="first">
        <el-form ref="xzt" :model="xzt" label-position="right">
          <el-form-item>
            <h4>选择题题干</h4>
            <UE
              v-model="xzt_defaultMsg"
              :id="xzt_UE"
              :writeMsg="xzt_defaultMsg"
              :config="xzt_config"
              ref="xzt_ue"
            ></UE>
          </el-form-item>
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
                <el-button @click.prevent="removeXzt(xx)">删除</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="答案">
            <el-radio
              v-for="(xx,index) in xzt.xzt_xx"
              v-model="xzt_radio"
              :label="index"
              :key="index"
            >{{xzt_label(index)}}</el-radio>
          </el-form-item>
          <el-form-item label="分值:">
            <el-row type="flex">
              <el-col :span="5">
                <el-input-number v-model="xzt_fz" controls-position="right" :min="0" :max="50"></el-input-number>
              </el-col>
              <el-col :span="5">
                <div>难易度:
                  <el-select v-model="value">
                    <el-option
                      v-for="item in nyd"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xzt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="xzt_add">添加选项</el-button>
            <el-button @click="xzt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="second">
        <el-form ref="tkt" :model="tkt" label-position="right">
          <el-form-item>
            <h4>填空题题干</h4>
            <UE
              v-model="tkt_defaultMsg"
              :writeMsg="tkt_defaultMsg"
              :config="tkt_config"
              :id="tkt_UE"
              ref="tkt_ue"
            ></UE>
          </el-form-item>
          <el-form-item
            v-for="(xx,index) in tkt.tkt_xx"
            :key="index"
            :prop="'tkt_xx.'+index+'.text'"
            :label="'填空'+index"
            :rules="{required:true,message:'填空答案不能为空',trigger:'blur'}"
          >
            <el-row type="flex" justify="space-around">
              <el-col :span="22">
                <el-input v-model="xx.text" type="textarea" autosize clearable></el-input>
              </el-col>
              <el-col :span="1">
                <el-button @click.prevent="removeTkt(xx)">删除</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="分值:">
            <el-row type="flex">
              <el-col :span="5">
                <el-input-number v-model="tkt_fz" controls-position="right" :min="0" :max="50"></el-input-number>
              </el-col>
              <el-col :span="5">
                <div>难易度:
                  <el-select v-model="value">
                    <el-option
                      v-for="item in nyd"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="tkt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="tkt_add">添加空格</el-button>
            <el-button @click="tkt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="thrid">
        <el-form ref="tkt" :model="tkt" label-position="right">
          <el-form-item>
        <UE
          v-model="pdt_defaultMsg"
          :writeMsg="pdt_defaultMsg"
          :config="pdt_config"
          :id="pdt_UE"
          ref="pdt_ue"
        ></UE>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="pdt_radio">
            <el-radio-button label="对"></el-radio-button>
            <el-radio-button label="错"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="pdt_submit">提交</el-button>
            <el-button @click="pdt_dialogVisible">预览</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="简答题" name="fourd"></el-tab-pane>
      <el-tab-pane label="综合题" name="fifth"></el-tab-pane>
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
    <el-dialog title="预览" :visible.sync="tkt_Dialog" width="30%" center>
      <span v-html="tkt_defaultMsg"></span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="pdt_Dialog" width="30%" center>
      <span v-html="pdt_defaultMsg"></span>
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
      activeName: "thrid",
      value: "",
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
      xzt_fz: "0",
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
      xzt_radio: "1",
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
      tkt_fz: "0",
      pdt_defaultMsg: "",
      pdt_Dialog: false,
      pdt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      pdt_UE: "pdt_UE",
      pdt_radio:"对"
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
      console.log(this.$refs.xzt_ue.getUEContent());
      console.log(this.xzt.xzt_xx);
      console.log(this.xzt_radio);
      console.log(this.xzt_fz);
      console.log(this.value)
      var tg = this.xzt.xzt_xx
      this.$http.post("/api/xzt",{tg:this.$refs.xzt_ue.getUEContent(),xx:this.xzt.xzt_xx,dn:this.xzt.xzt_radio,fz:this.tkt_fz,nyd:this.value}).then(function(res){
        console.log(res.body)
      })
    },
    xzt_dialogVisible() {
      this.xzt_defaultMsg = this.$refs.xzt_ue.getUEContent();
      console.log(this.$refs.xzt_ue.getUEContent());
      this.xzt_Dialog = true;
    },
    tkt_submit() {
      console.log(this.$refs.tkt_ue.getUEContent());
    },
    tkt_add() {
      this.tkt.tkt_xx.push({
        text: ""
      });
      var kg = "{____}";
      this.$refs.tkt_ue.insertHtml(
        "______"
      );
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
    pdt_submit(){

    },
    pdt_dialogVisible(){
      this.pdt_defaultMsg = this.$refs.pdt_ue.getUEContent();
      this.pdt_Dialog = true;
      console.log(this.pdt_defaultMsg)
      console.log(this.$refs.pdt_ue.getUEContent())
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
#editor {
  margin-top: 10px;
  margin-bottom: 10px;
}
h4 {
  text-align: center;
}
</style>