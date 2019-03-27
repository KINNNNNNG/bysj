<template>
  <div>
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
        v-for="(xx,index) in dxt_xx"
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
          v-for="(xx,index) in dxt_xx"
          v-model="dxt_radio"
          :label="dxt_label(index)"
          :key="index"
        >{{dxt_label(index)}}</el-checkbox>
      </el-form-item>
      <el-form-item label="难易度:">
        <el-select v-model="dxt_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dxt_submit">提交</el-button>
        <el-button icon="el-icon-plus" @click="dxt_add">添加选项</el-button>
        <el-button @click="dxt_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="dxt_Dialog" width="30%" center>
      <span v-html="dxt_defaultMsg"></span>
      <span v-for="(xx,index) in dxt_xx" :key="index">
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
    <el-dialog title="提交" :visible.sync="submit_Dialog" width="30%" center>
      <span>{{submit_log}}</span>
    </el-dialog>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
  components: { UE },
  props: ["dxt_value", "dxt_xx", "dxt_defaultMsg", "dxt_radio", "dxt_id"],
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
      dxt: [],
      dxt_UE: "dxt_UE",
      dxt_num: 65,
      dxt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      dxt_Dialog: false
    };
  },
  mounted() {
    this.re();
  },
  watch: {
    dxt_defaultMsg() {
      this.$refs.dxt_ue.setUEContent(this.dxt_defaultMsg);
    }
  },
  methods: {
    re() {
      this.$refs.dxt_ue.setUEContent(this.dxt_defaultMsg);
    },
    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    dxt_add() {
      this.dxt_xx.push({
        text: "",
        key: Date.now()
      });
      this.dxt_num++;
    },
    removeDxt(item) {
      var index = this.dxt_xx.indexOf(item);
      if (index !== -1) {
        console.log(index);
        this.dxt_num--;
        this.dxt_xx.splice(index, 1);
      }
    },
    dxt_submit() {
      this.$http
        .post("/api/updateDxt", {
          id: this.dxt_id,
          tigan: this.$refs.dxt_ue.getUEContent(),
          xx: this.dxt_xx,
          da: this.dxt_radio,
          nyd: this.dxt_value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "修改成功", type: "success" });
            this.$emit("success");
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    dxt_dialogVisible() {
      this.dxt_defaultMsg = this.$refs.dxt_ue.getUEContent();
      console.log(this.$refs.dxt_ue.getUEContent());
      this.dxt_Dialog = true;
    }
  }
};
</script>

