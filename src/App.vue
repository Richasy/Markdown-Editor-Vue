<template>
  <split-pane
    :min-percent="layoutOptions.minPercent"
    :default-percent="layoutOptions.defaultPercent"
    :max-percent="layoutOptions.maxPercent"
    split="vertical"
    v-on:resize="onResize"
  >
    <template slot="paneL">
      <editor v-if="displayType=='editor'||displayType=='split'" />
    </template>
    <template slot="paneR">
      <preview v-if="displayType=='preview'||displayType=='split'"/>
    </template>
  </split-pane>
</template>

<script>
import editor from "./components/Editor.vue";
import preview from "./components/Preview.vue";
import splitPane from "vue-splitpane";
import { notifyPack } from "./models/notifyPack.js";

export default {
  name: "App",
  components: {
    editor,
    splitPane,
    preview,
  },
  data() {
    return {
      displayType: "",
      layoutOptions: {
        minPercent: 30,
        defaultPercent: 50,
        maxPercent: 80,
      },
    };
  },
  mounted() {
    self.app = this;
    window.addEventListener('resize',function(e){
      self.app.onResize();
    });
    //window.external.notify(notifyPack.createPackJson('appLoaded',''))
    console.log(notifyPack.createPackJson("appLoaded", ""));
  },
  methods: {
    onResize() {
      if (window.Editor) {
        window.Editor.mdEditor.layout();
      }
    },
    updateDisplay(displayInput) {
      let displayOptions;
      if (typeof displayInput == "string")
        displayOptions = JSON.parse(displayInput);
      else displayOptions = displayInput;
      this.displayType = displayOptions.displayType;
      this.layoutOptions.minPercent = displayOptions.minPercent;
      this.layoutOptions.maxPercent = displayOptions.maxPercent;
      this.layoutOptions.defaultPercent = displayOptions.defaultPercent;
    },
  },
};
</script>
