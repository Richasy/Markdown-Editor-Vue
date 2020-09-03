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
export default {
  name: "Editor",
  mounted() {
    monaco.languages.register({ id: "markdownEx" });
    monaco.languages.setMonarchTokensProvider("markdownEx", language);
    monaco.languages.setLanguageConfiguration("markdownEx", langConfig);
    monaco.editor.defineTheme("acrmd", theme);
    this.mdEditor = monaco.editor.create(
      this.$refs.editorContainer,
      editorConfig
    );
    window.mdEditor = this.mdEditor;
    actions.forEach((act) => {
      this.mdEditor.addAction(act);
    });
  },
  data() {
    return {
      mdEditor: null,
    };
  },
  methods: {},
};
</script>

<style scoped>
.editorContainer {
  overflow: hidden;
  height: 100vh;
}
</style>
