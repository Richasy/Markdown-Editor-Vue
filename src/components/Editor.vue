<template>
  <div class="editorContainer" ref="editorContainer" />
</template>

<script>
import * as monaco from "monaco-editor";
import language from "../lib/markdownEx-language.js";
import langConfig from "../lib/markdownEx-config.js";
import theme from "../lib/markdownEx-theme.js";
import editorConfig from "../lib/editorConfig.js";
import { actions, textEffect } from "../lib/editorAction.js";
import { notifyPack } from "../models/notifyPack.js";
import { errorPack } from "../models/errorPack.js";
export default {
  name: "editor",
  mounted() {
    monaco.languages.register({ id: "markdownEx" });
    monaco.languages.setMonarchTokensProvider("markdownEx", language);
    monaco.languages.setLanguageConfiguration("markdownEx", langConfig);
    monaco.editor.defineTheme("acrmd", theme);
    this.mdEditor = monaco.editor.create(
      this.$refs.editorContainer,
      editorConfig
    );
    this.mdEditor.onDidChangeModelContent(this.onContentChanged);
    window.Editor = this;
    window.monaco = this.mdEditor;
    actions.forEach((act) => {
      this.mdEditor.addAction(act);
    });
    //window.external.notify(notifyPack.createPackJson('editorLoaded',''))
    console.log(notifyPack.createPackJson("editorLoaded", ""));
  },
  data() {
    return {
      mdEditor: null,
    };
  },
  methods: {
    onContentChanged(){
      console.log('yo!');
      this.$store.dispatch('updateDisplay');
    },
    excuteAction(actId) {
      let action = this.mdEditor.getAction(actId);
      if (action)
        action
          .run()
          .then(() => {
            //window.external.notify(notifyPack.createPackJson('excuteActionSuccess',actId))
            console.log(
              notifyPack.createPackJson("excuteActionSuccess", actId)
            );
          })
          .catch((err) => {
            let msg = errorPack.createJson(err, "excuteAction", actId);
            //window.external.notify(notifyPack.createPackJson('excuteActionFailed',msg))
            console.log(notifyPack.createPackJson("excuteActionFailed", msg));
          });
    },
    getActions() {
      if (actions && actions.length > 0) {
        let result = JSON.stringify(actions);
        return result;
      }
      return '[]';
    },
    setContent(str) {
      if (this.mdEditor) {
        let model = this.mdEditor.getModel();
        model.setValue(str);
      }
    },
    getContent(){
      if(this.mdEditor){
        let v=this.mdEditor.getModel().getValue();
        return v;
      }
      return '';
    },
    defineTheme(themeName, themeJson) {
      try {
        let themeObj = JSON.parse(themeJson);
        this.mdEditor.defineTheme(themeName, themeObj);
        //window.external.notify(notifyPack.createPackJson('defineThemeSuccess',themeName))
        console.log(notifyPack.createPackJson("defineThemeSuccess", themeName));
      } catch (err) {
        let msg = errorPack.createJson(err, "defineTheme", themeName);
        //window.external.notify(notifyPack.createPackJson('defineThemeFailed',msg))
        console.log(notifyPack.createPackJson("defineThemeFailed", msg));
      }
    },
    setTheme(themeName) {
      try {
        this.mdEditor.setTheme(themeName);
      } catch (err) {
        let msg = errorPack.createJson(err, "setTheme", themeName);
        //window.external.notify(notifyPack.createPackJson('setThemeFailed',msg))
        console.log(notifyPack.createPackJson("setThemeFailed", msg));
      }
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
