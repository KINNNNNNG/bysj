<template>
  <div>
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
        v-for="(xx,index) in xzt_xx"
        :label="xzt_label(index)"
        :prop="'xzt_xx['+index+'].text'"
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
          v-for="(xx,index) in xzt_xx"
          v-model="xzt_radio"
          :label="xzt_label(index)"
          :key="index"
        >{{xzt_label(index)}}</el-radio>
      </el-form-item>
      <el-form-item label="难易度:">
        <el-select v-model="xzt_value">
          <el-option v-for="item in nyd" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="xzt_submit">提交</el-button>
        <el-button icon="el-icon-plus" @click="xzt_add">添加选项</el-button>
        <el-button @click="xzt_dialogVisible">预览</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-dialog title="预览" :visible.sync="xzt_Dialog" width="30%" center>
        <span v-html="xzt_defaultMsg"></span>
        <span v-for="(xx,index) in xzt_xx" :key="index">
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
    </div>
    <el-dialog title="提交" :visible.sync="submit_Dialog" width="30%" center>
      <span>{{submit_log}}</span>
    </el-dialog>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
  components: { UE },
  props: ["xzt_value", "xzt_xx", "xzt_radio", "xzt_defaultMsg","xzt_id"],
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
      xzt_UE: "xzt_UE",
      xzt: [],
      num: 65,
      xzt_Dialog: false,
      xzt_config: {
        initialContent: "请输入题干内容...",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent: true
      },
    };
  },
  mounted() {
    this.re();
  },
  watch:{
    xzt_defaultMsg(){
      this.$refs.xzt_ue.setUEContent(this.xzt_defaultMsg);
    }
  },
  methods: {
    re() {
      this.$refs.xzt_ue.setUEContent(this.xzt_defaultMsg);
    },
    xzt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    xzt_add() {
      this.xzt_xx.push({
        text: "",
        key: Date.now()
      });
      this.num++;
    },
    removeXzt(item) {
      var index = this.xzt_xx.indexOf(item);
      if (index !== -1) {
        console.log(index);
        this.num--;
        this.xzt_xx.splice(index, 1);
      }
      console.log(this.xzt.xzt_xx);
    },
    xzt_submit() {
      this.$http
        .post("/api/updateXzt", {
          id:this.xzt_id,
          tigan: this.$refs.xzt_ue.getUEContent(),
          xx: this.xzt_xx,
          da: this.xzt_radio,
          nyd: this.xzt_value
        })
        .then(function(res) {
          if ((res.bodyText == "true")) {
            this.$message({ message: "修改成功", type: "success" });
            this.$emit('success')
          } else {
            this.$message.error(res.body);
          }
        });
    },
    xzt_dialogVisible() {
      this.xzt_defaultMsg = this.$refs.xzt_ue.getUEContent();
      console.log(this.$refs.xzt_ue.getUEContent());
      this.xzt_Dialog = true;
    }
  }
};
</script>
