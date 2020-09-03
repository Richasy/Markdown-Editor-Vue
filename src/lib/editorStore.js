import Vue from 'vue'
import Vuex from 'vuex';
import {previewConfig} from '../lib/previewConfig.js';

Vue.use(Vuex)

let editorStore=new Vuex.Store({
    state:{
        markdown:'',
        html:'',
        markdownIt:previewConfig.getMarkdownItParser(),
        theme:'',
    },
    mutations:{
        updateMarkdown(state,content){
            if(!content)
                content=window.Editor.getContent();
            state.markdown=content;
            state.html = state.markdownIt.render(content);
        },
        updateTheme(state,themeName){
            state.theme=themeName;
        }
    },
    actions:{
        updateDisplay(context,markdown){
            context.commit('updateMarkdown',markdown);
        }
    }
})

export {editorStore};