<template>
  <div>
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
        v-for="(xx,index) in tkt_xx"
        :key="index"
        :prop="'tkt_xx['+index+'].text'"
        :label="'填空'+index"
        :rules="{required:true,message:'填空答案不能为空',trigger:'blur'}"
      >
        <el-row type="flex" justify="space-around">
          <el-col :span="22">
            <el-input v-model="xx.text" type="textarea" autosize clearable placeholder="多个答案请用#分隔"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button @click.prevent="removeTkt(xx)" type="danger" icon="el-icon-delete"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="难易度:">
        <el-select v-model="tkt_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="tkt_submit">提交</el-button>
        <el-button icon="el-icon-plus" @click="tkt_add">添加空格</el-button>
        <el-button @click="tkt_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="tkt_Dialog" width="30%" center>
      <span v-html="tkt_defaultMsg"></span>
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
  props:["tkt_value","tkt_defaultMsg","tkt_xx","tkt_id"],
  data() {
    return {
      submit_Dialog: false,
      submit_log: "",
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
      tkt_Dialog: false,
      tkt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      tkt_UE: "tkt_UE",
      tkt: []
    };
  },
  mounted(){
    this.re()
  },
  watch:{
    dxt_defaultMsg(){
      this.$refs.tkt_ue.setUEContent(this.tkt_defaultMsg)
    }
  },
  methods: {
    re(){this.$refs.tkt_ue.setUEContent(this.tkt_defaultMsg)},
    tkt_submit() {
      this.$http
        .post("/api/tkt", {
          id:this.tkt_id,
          tigan: this.$refs.tkt_ue.getUEContent(),
          da: this.tkt_xx,
          nyd: this.tkt_value
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$message({ message: "修改成功", type: "success" });
          } else {
            this.$message.error(res.body);
          }
        });
      console.log(this.$refs.tkt_ue.getUEContent());
    },
    tkt_add() {
      this.tkt_xx.push({
        text: ""
      });
      this.$refs.tkt_ue.insertHtml("(______)");
    },
    tkt_dialogVisible() {
      this.tkt_defaultMsg = this.$refs.tkt_ue.getUEContent();
      this.tkt_Dialog = true;
    },
    removeTkt(item) {
      var index = this.tkt_xx.indexOf(item);
      if (index !== -1) {
        this.tkt_xx.splice(index, 1);
      }
    }
  }
};
</script>

