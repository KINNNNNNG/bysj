<template>
  <div>
    <el-form ref="jdt" :model="jdt" label-position="right">
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
        <el-select v-model="jdt_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="jdt_submit">提交</el-button>
        <el-button @click="jdt_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="jdt_Dialog" width="30%" center>
      <span v-html="jdt_defaultMsg"></span>
    </el-dialog>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
  components: { UE },
  props: ["jdt_value", "jdt_defaultMsg", "jdt_da", "jdt_id"],
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
      jdt: [],
      jdt_UE: "jdt_UE",
      jdt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      jdt_Dialog: false
    };
  },
  mounted() {
    this.re();
  },
  watch: {
    jdt_defaultMsg() {
      this.$refs.jdt_ue.setUEContent(this.jdt_defaultMsg);
    }
  },
  methods: {
    re() {
      this.$refs.jdt_ue.setUEContent(this.jdt_defaultMsg);
    },
    jdt_submit() {
      this.$http
        .post("/api/updateJdt", {
          id:this.jdt_id,
          tigan: this.$refs.jdt_ue.getUEContent(),
          da: this.jdt_da,
          nyd: this.jdt_value
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$message({ message: "修改成功", type: "success" });
          } else {
            this.$message.error(res.body);
          }
        });
    },
    jdt_dialogVisible() {
      this.jdt_defaultMsg = this.$refs.jdt_ue.getUEContent();
      this.jdt_Dialog = true;
      console.log(this.jdt_defaultMsg);
      console.log(this.$refs.jdt_ue.getUEContent());
    }
  }
};
</script>

