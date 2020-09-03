<template>
<split-pane :min-percent='30' :default-percent='50' :max-percent='80' split="vertical" v-on:resize="onResize">
  <template slot="paneL">
    <editor/>
  </template>
  <template slot="paneR">
    <preview/>
  </template>
</split-pane>
  
</template>

<script>
import editor from './components/Editor.vue'
import preview from './components/Preview.vue'
import splitPane from 'vue-splitpane'

export default {
  name: 'App',
  components: {
    editor,
    splitPane,
    preview
  },
  methods:{
    onResize(){
      if(window.monaco){
        window.monaco.layout();
      }
    }
  }
}
</script>
