<template>
  <div>
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
      <el-form-item v-for="(tm,index) in zht_all" :prop="'zht.'+index+'.tm'" :key="index">
        <el-input autosize placeholder="请输入综合题题目" v-model="tm.tm"></el-input>
        <el-input type="textarea" autosize placeholder="请输入综合题答案" v-model="tm.da"></el-input>
      </el-form-item>
      <el-form-item label="难易度:">
        <el-select v-model="zht_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="zht_submit">提交</el-button>
        <el-button icon="el-icon-plus" @click="zht_add">添加小题</el-button>
        <el-button @click="zht_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
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
  props: ["zht_value", "zht_defaultMsg", "zht_all", "zht_id"],
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
      zht_UE: "zht_UE",
      zht_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
      zht_Dialog: false,
      zht: []
    };
  },
  mounted() {
    this.re();
  },
  watch: {
    zht_defaultMsg() {
      this.$refs.zht_ue.setUEContent(this.zht_defaultMsg);
    }
  },
  methods: {
    re() {
      this.$refs.zht_ue.setUEContent(this.zht_defaultMsg);
    },
    zht_submit() {
      this.$http
        .post("/api/updateZht", {
          id: this.zht_id,
          tigan: this.$refs.zht_ue.getUEContent(),
          da: this.zht_all,
          nyd: this.zht_value
        })
        .then(function(res) {
          if ((res.bodyText = "true")) {
            this.$message({ message: "修改成功", type: "success" });
            this.$emit("success");
          } else {
            this.$message.error(res.bodyText);
          }
        });
    },
    zht_dialogVisible() {
      this.zht_defaultMsg = this.$refs.zht_ue.getUEContent();
      this.zht_Dialog = true;
    },
    zht_add() {
      this.zht_all.push({
        tm: "",
        da: ""
      });
    }
  }
};
</script>

