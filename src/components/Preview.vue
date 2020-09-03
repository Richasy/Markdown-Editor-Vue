<template>
  <div ref="previewContainer" id="previewContainer" v-html="html" :class="themeName"></div>
</template>

<script>
import '../style/acrmd.css';
import "highlight.js/styles/dracula.css";
export default {
    
  name: "preview",
  mounted() {
    window.Preview = this;
  },
  computed: {
    html() {
      return this.$store.state.html;
    },
    themeName() {
      return this.$store.state.theme;
    },
  },
  methods: {
    setCss(cssString) {
      let style = document.querySelector(`style#editorThemeStyle`);
      if (style) {
        style.innerHTML = cssString;
      } else {
        style = document.createElement("style");
        style.id = "editorThemeStyle";
        style.innerHTML = cssString;
        document.head.appendChild(style);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css");
</style>