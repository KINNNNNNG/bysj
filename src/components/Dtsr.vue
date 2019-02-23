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
            :label="xzt_label(index)"
            :prop="'xzt_xx.'+index+'.text'"
            :key="xx.label"
          >
          <el-row type="flex" justify="space-around">
                  <el-col :span="22"><el-input v-model="xx.text"></el-input></el-col>
                  <el-col :span="1"><el-button @click.prevent="removeXzt(xx)">删除</el-button></el-col>
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
        
      </el-tab-pane>
      <el-tab-pane label="判断题" name="thrid"></el-tab-pane>
      <el-tab-pane label="简答题" name="fourd"></el-tab-pane>
      <el-tab-pane label="综合题" name="fifth"></el-tab-pane>
      <el-dialog
        title="预览"
        :visible.sync="xzt_Dialog"
        width="30%"
        center>
        <span v-html="xzt_defaultMsg"></span>
        <span v-for="(xx,index) in xzt.xzt_xx" :key="index">
          <el-row type="flex" justify="space-around">
            <el-col :span="1"><div>{{xzt_label(index)}}</div></el-col>
            <el-col :span="22"><div>{{xx.text}}</div></el-col>
          </el-row>
        </span>
      </el-dialog>
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
      xzt_defaultMsg: '',
      xzt_config: {
        initialContent:"请输入题干内容...(如果是填空题请用{***}来表示横线)",
        initialFrameWidth: null,
        initialFrameHeight: 350,
        autoClearinitialContent:true
      },
      xzt_Dialog:false
    };
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
    },
    xzt_label(index){
      var label = index+65;
      return String.fromCharCode(label);
    },
    xzt_add() {
      
      this.xzt.xzt_xx.push({
        text: "",
        key:Date.now()
      });
      this.num++;
    },
    removeXzt(item) {
      var index = this.xzt.xzt_xx.indexOf(item);
      if (index !== -1) {
        console.log(index)
        this.num--
        this.xzt.xzt_xx.splice(index,1)
      }
      console.log(this.xzt.xzt_xx)
      
    },
    xzt_submit() {
      
      console.log(this.$refs.ue.getUEContent())
        console.log(this.xzt)
    },
    xzt_dialogVisible(){
      this.xzt_defaultMsg = this.$refs.ue.getUEContent()
      console.log(this.$refs.ue.getUEContent())
      this.xzt_Dialog = true
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