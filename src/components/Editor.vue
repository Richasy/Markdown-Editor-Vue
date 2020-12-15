<template>
  <div class="editorContainer" ref="editorContainer" />
</template>

<script>
import * as monaco from "monaco-editor";
import language from "../lib/markdownEx-language.js";
import langConfig from "../lib/markdownEx-config.js";
//import theme from "../lib/markdownEx-theme.js";
//import editorConfig from "../lib/editorConfig.js";
import { actions, textEffect } from "../lib/editorAction.js";
import { notifyPack } from "../models/notifyPack.js";
import { errorPack } from "../models/errorPack.js";
export default {
  name: "editor",
  mounted() {
    window.Editor = this;
    this.$refs.editorContainer.addEventListener('contextmenu',function(e){
      e.preventDefault();
      let x=e.pageX;
      let y=e.pageY;
      //window.external.notify(notifyPack.createPackJson('contextMenu',{x,y}));
    })
    //this.initialization();
  },
  data() {
    return {
      mdEditor: null,
    };
  },
  methods: {
    /**文本变动处理*/
    onContentChanged() {
      this.$store.dispatch("updateDisplay");
      //window.external.notify(notifyPack.createPackJson('contentChanged',''));
    },
    onScrollChanged(e) {
      if (window.app.displayType == "split") {
        let preview = document.getElementById("previewContainer");
        if (preview) {
          let xi=e.scrollTop/e.scrollHeight;
          let top=xi*preview.scrollHeight;
          preview.scrollTop=top;
        }
      }
    },
    /** 初始化编辑器
     * @param markdown 初始Markdown文本
     * @param themeName 主题名称
     * @param themeData 主题数据
     */
    initialization(markdown, inputOption, themeData) {
      monaco.languages.register({ id: "markdownEx" });
      monaco.languages.setMonarchTokensProvider("markdownEx", language);
      monaco.languages.setLanguageConfiguration("markdownEx", langConfig);
      let editOptions;
      if(typeof(inputOption)=='string')
        editOptions=JSON.parse(inputOption);
      else
        editOptions=inputOption;
      let themeName=editOptions.theme;
      if (themeName) {
        console.log('yo');
        if (themeData && themeName!='vs' && themeName!='vs-dark') {
          monaco.editor.defineTheme(themeName, themeData);
        }
        this.$store.commit("updateTheme", themeName);
        //editorConfig.theme = themeName;
      } else {
        let theme = require("../lib/markdownEx-theme.js").default;
        monaco.editor.defineTheme("acrmd", theme);
        editOptions.theme='acrmd';
        this.$store.commit("updateTheme", "acrmd");
      }
      if (markdown) {
        editOptions.value = markdown;
        this.$store.dispatch("updateDisplay", markdown);
      }
      editOptions.contextmenu=false;
      editOptions.quickSuggestions=false;
      editOptions.wordWrap='on';
      editOptions.stopRenderingLineAfter=-1;
      editOptions.language='markdownEx';
      this.mdEditor = monaco.editor.create(
        this.$refs.editorContainer,
        editOptions
      );
      window.mdEditor=this.mdEditor;
      this.mdEditor.onDidChangeModelContent(this.onContentChanged);
      this.mdEditor.onDidScrollChange(e=>this.onScrollChanged(e));
      
      actions.forEach((act) => {
        this.mdEditor.addAction(act);
      });
      //window.external.notify(notifyPack.createPackJson('editorLoaded',''))
      console.log(notifyPack.createPackJson("editorLoaded", ""));
    },
    /**执行操作
     * @param actId 操作ID
     */
    excuteAction(actId) {
      let action = this.mdEditor.getAction(actId);
      if (action)
        action
          .run()
          .then(() => {
            //window.external.notify(notifyPack.createPackJson('excuteActionSuccess',actId))
            // console.log(
            //   notifyPack.createPackJson("excuteActionSuccess", actId)
            // );
          })
          .catch((err) => {
            let msg = errorPack.createJson(err, "excuteAction", actId);
            //window.external.notify(notifyPack.createPackJson('excuteActionFailed',msg))
            console.log(notifyPack.createPackJson("excuteActionFailed", msg));
          });
    },
    /**获取编辑器的全部可执行操作 */
    getActions() {
      if (actions && actions.length > 0) {
        let result = JSON.stringify(actions);
        return result;
      }
      return "[]";
    },
    /**设置编辑器文本
     * @param str 输入文本
     */
    setContent(str) {
      if (this.mdEditor) {
        let model = this.mdEditor.getModel();
        model.setValue(str);
        this.mdEditor.setScrollTop(0);
      }
    },
    /**获取编辑器文本 */
    getContent() {
      if (this.mdEditor) {
        let v = this.mdEditor.getModel().getValue();
        return v;
      }
      return "";
    },
    /**定义主题
     * @param themeName 主题名称
     * @param themeJson 主题数据
     */
    defineTheme(themeName, themeJson) {
      try {
        let themeObj = JSON.parse(themeJson);
        monaco.editor.defineTheme(themeName, themeObj);
        //window.external.notify(notifyPack.createPackJson('defineThemeSuccess',themeName))
        console.log(notifyPack.createPackJson("defineThemeSuccess", themeName));
      } catch (err) {
        let msg = errorPack.createJson(err, "defineTheme", themeName);
        //window.external.notify(notifyPack.createPackJson('defineThemeFailed',msg))
        console.log(notifyPack.createPackJson("defineThemeFailed", msg));
      }
    },
    /**设置主题
     * @param themeName 主题名称
     */
    setTheme(themeName) {
      try {
        monaco.editor.setTheme(themeName);
      } catch (err) {
        let msg = errorPack.createJson(err, "setTheme", themeName);
        //window.external.notify(notifyPack.createPackJson('setThemeFailed',msg))
        console.log(notifyPack.createPackJson("setThemeFailed", msg));
      }
    },
    /**更新配置项 */
    updateOptions(input) {
      let options;
      if (typeof input == "string") options = JSON.parse(input);
      else options = input;
      this.mdEditor.updateOptions(options);
    },
  },
};
</script>

<style scoped>
.editorContainer {
  overflow: hidden;
  height: 100vh;
}
</style>
