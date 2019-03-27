<template>
  <div class="plsr" id="plsr">
    <el-tabs v-model="tabsactive">
      <el-tab-pane label="Word文档上传" name="first">
        <el-steps :active="wordactive" align-center>
          <el-step title="题目数量" description="请选择要导入的题目数量"></el-step>
          <el-step title="上传文件" description="请选择要导入的题目数量"></el-step>
          <el-step title="完成" description="完成批量导入"></el-step>
        </el-steps>
        <div v-if="wordactive==1" class="center">
          <div class="num">
            <b>注意：</b>请输入单选题与多选题的选项数量，若文档内的选项数量不等，请使用最小的数量，否则将会出现导入错误，或者在文档中将数量统一，个别题目请手动输入
          </div>
          <div class="num">
            <span>多选题选项数量:</span>
            <el-input-number v-model="dxtxxNum" label="描述文字"></el-input-number>
            <span>单选题选项数量</span>
            <el-input-number v-model="xztxxNum" label="描述文字"></el-input-number>
          </div>
          <el-button @click="wordnext">下一步</el-button>
        </div>
        <div v-if="wordactive==2" class="center">
          <el-upload class="upload-demo" drag action="/api/upload" accept=".docx">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传docx文件，且不超过1MB</div>
          </el-upload>
          <el-button @click="wordnext">下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Excel表格上传" name="second">
        <el-steps :active="excelactive" align-center>
          <el-step title="题目数量" description="请选择要导入的题目数量"></el-step>
          <el-step title="上传文件" description="请选择要导入的题目数量"></el-step>
          <el-step title="完成" description="完成批量导入"></el-step>
        </el-steps>
        <div v-if="excelactive==1" class="center">
          <div class="num">
            <b>注意：</b>请输入单选题与多选题的选项数量，若文档内的选项数量不等，请使用最小的数量，否则将会出现导入错误，或者在文档中将数量统一，个别题目请手动输入
          </div>
          <div class="num">
            <span>多选题选项数量:</span>
            <el-input-number v-model="dxtxxNum" label="描述文字"></el-input-number>
            <span>单选题选项数量</span>
            <el-input-number v-model="xztxxNum" label="描述文字"></el-input-number>
          </div>
          <el-button @click="excelnext">下一步</el-button>
        </div>
        <div v-if="excelactive==2" class="center">
          <el-upload class="upload-demo" drag action="/api/uploadexcel" accept=".xlsx,.xls">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx,xls文件，且不超过1MB</div>
          </el-upload>
          <el-button @click="excelnext">下一步</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsactive:"first",
      wordactive: 1,
      excelactive:1,
      dxtxxNum: 4,
      xztxxNum: 4,
      uploadnum: []
    };
  },
  methods: {
    wordnext() {
      if (this.wordactive == 1) {
        this.$http
          .post("/api/uploadnum", {
            xzt: this.xztxxNum,
            dxt: this.dxtxxNum
          })
          .then(function(res) {
            this.wordactive++;
          },function(res) {
            this.$message.error(res.bodyText);
          })
      }
      if (this.wordactive == 2) {
        this.$http
          .get("/api/postuploadnum")
          .then(function(res) {
            this.uploadnum = res.body;
            console.log(this.uploadnum);
            this.wordactive++;
          },function(res) {
            this.$message.error(res.bodyText);
          })
      }
    },
    excelnext(){
      if(this.excelactive==1){
        this.$http.post("/api/uploadnum",{
          xzt:this.xztxxNum,
          dxt:this.dxtxxNum
        }).then(function(res){
          this.excelactive++;
        },function(res){
          this.$message.error(res.bodyText);
        })
      }
      if(this.excelactive == 2){
        this.$http.get("/api/postuploadnum")
        .then(function(res){
          this.uploadnum = res.body;
          this.excelactive++
        },function(res){
          this.$message.error(res.bodyText)
        })
      }
    }

  }
};
</script>
<style>
.num {
  margin: 20px;
}
.center {
  text-align: center;
}
</style>


