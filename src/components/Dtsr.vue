<template>
  <div class="dtsr" id="dtsr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="选择题" name="first">
          <el-row type="flex" justify="space-around">
                  <el-col :span="23"><UE v-model="xzt_defaultMsg" :writeMsg="xzt_defaultMsg" :config="xzt_config" ref="ue"></UE></el-col>
              </el-row>
        <el-form ref="xzt" :model="xzt" label-width="20px" label-position="right">
          <el-form-item
            v-for="(xx,index) in xzt.xzt_xx"
            :label="xx.label"
            :prop="'xzt_xx.'+index+'.text'"
            :key="xx.key"
          >
          <el-row type="flex" justify="space-around">
                  <el-col :span="22"><el-input v-model="xx.text"></el-input></el-col>
                  <el-col :span="1"><el-button @click.native="removeXzt(xx)">删除</el-button></el-col>
              </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xzt_submit">提交</el-button>
            <el-button icon="el-icon-plus" @click="xzt_add">添加选项</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="second"></el-tab-pane>
      <el-tab-pane label="判断题" name="thrid"></el-tab-pane>
      <el-tab-pane label="简答题" name="fourd"></el-tab-pane>
      <el-tab-pane label="综合题" name="fifth"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import UE from "@/components/ue.vue";
export default {
    components:{UE},
  name: "Dtsr",
  data() {
    return {
      activeName: "first",
      xzt: {
        name: "",
        tm: "",
        xzt_xx: [
          {
            label: "A",
            text: ""
          },
          {
            label: "B",
            text: ""
          },
          {
            label: "C",
            text: ""
          },
          {
            label: "D",
            text: ""
          }
        ]
      },
      num: 3,
      xzt_defaultMsg: '',
      xzt_config: {
        initialContent:"请输入题干内容...(如果是填空题请用{***}来表示横线)",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent:true
      }
    };
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
    },
    xzt_add() {
      var add_label = this.xzt.xzt_xx[this.num].label;
      var AddLabelNum = add_label.charCodeAt() + 1;
      var add_label = String.fromCharCode(AddLabelNum);
      this.xzt.xzt_xx.push({
        label: add_label,
        text: ""
      });
      this.num++;
      console.log(add_label);
    },
    removeXzt(item) {
      var index = this.xzt.xzt_xx.indexOf(item);
      if (index !== -1) {
        this.xzt.xzt_xx.slice(index,1)
      }
      console.log(this.xzt.xzt_xx)
      console.log(index)
    },
    xzt_submit() {
      console.log(this.$refs.ue.getUEContent())
        console.log(this.xzt)
    }
  }
};
</script>

<style>
.el-row{
    margin-bottom: 20px
}
#editor{
    margin-top: 10px;
    margin-bottom: 10px
}
</style>