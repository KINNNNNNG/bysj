<template>
  <div>
    <script :id="id" :defaultMsg="writeMsg" type="text/plain"></script>
  </div>
</template>

<script>
export default {
  name: "UEditor",
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    },
    writeMsg: {
      type: String
    }
  },
  //  components:{util},
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    //初始化UE
    this.$nextTick(() => {
      //避免在切换到填空题再切回来找不到dom而报offsetWidth undefined
      const _this = this;
      this.editor = UE.delEditor(this.id);
      this.editor = UE.getEditor(this.id, this.config);
      this.editor.addListener("ready", function() {
        _this.isinit = true;
      });
    });
  },
  destoryed() {
    this.editor.destory();
  },
  methods: {
    getUEContent: function() {
      return this.editor.getContent();
    },
    getContentTxt: function() {
      return this.editor.getContentTxt();
    },

    setUEContent: function(val) {
      if (this.editor && this.editor.isReady) {
        const _this = this;
        setTimeout(function() {
          //过段时间在加载
          _this.editor.setContent(val);
        }, 500);
        return;
      } else {
        const _this = this;
        setTimeout(function() {
          //过段时间在加载
          _this.setContent(val);
        }, 500);
      }
    },
    insertHtml(value) {
        this.editor.execCommand('insertHtml', value)
    }
    
  }
};
</script>