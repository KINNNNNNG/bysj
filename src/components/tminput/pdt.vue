<template>
  <div>
    <el-form ref="pdt" :model="pdt" label-position="right">
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
        <el-select v-model="pdt_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pdt_submit">提交</el-button>
        <el-button @click="pdt_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="pdt_Dialog" width="30%" center>
      <span v-html="pdt_defaultMsg"></span>
    </el-dialog>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
  components: { UE },
  props: ["pdt_value", "pdt_defaultMsg", "pdt_radio", "pdt_id"],
  data() {
    return {
      submit_Dialog: false,
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
      pdt: [],
      pdt_Dialog: false,
      pdt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      pdt_UE: "pdt_UE"
    };
  },
  mounted() {
    this.re();
  },
  watch: {
    pdt_defaultMsg() {
      this.$refs.pdt_ue.setUEContent(this.pdt_defaultMsg);
    }
  },
  methods: {
    re() {
      this.$refs.pdt_ue.setUEContent(this.pdt_defaultMsg);
    },
    pdt_submit() {
      this.$http
        .post("/api/updatePdt", {
          id: this.pdt_id,
          tigan: this.$refs.pdt_ue.getUEContent(),
          da: this.pdt_radio,
          nyd: this.pdt_value
        })
        .then(function(res) {
          if (res.bodyText == "true") {
            this.$message({ message: "修改成功", type: "success" });
            this.$emit("success");
          } else {
            this.$message.error(res.body);
          }
        });
    },
    pdt_dialogVisible() {
      this.pdt_defaultMsg = this.$refs.pdt_ue.getUEContent();
      this.pdt_Dialog = true;
    }
  }
};
</script>
