<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
import '../../static/UE/ueditor.config.js'
import '../../static/UE/ueditor.all.js'
import '../../static/UE/lang/zh-cn/zh-cn.js'
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      writeMsg:{
        type:String
      }
    },
    mounted() {
      this.$nextTick(()=>{
        const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg);
      })
       // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getContent(){
        return this.editor.getContentTxt()
      },
      setContent(val){
        if(this.editor&&this.editor.isReady){
          const_this = this;
          setTimeout(function(){
            _this.editor.setContent(val)
          },500);
          return;
        }else{
          const_this = this
          setTimeout(function(){
            _this.editor.setUEContent(val)
          },500)
        }
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style>
  
</style>
