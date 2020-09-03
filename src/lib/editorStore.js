import Vue from 'vue'
import Vuex from 'vuex';
import * as MarkdownIt from 'markdown-it';

Vue.use(Vuex)

let editorStore=new Vuex.Store({
    state:{
        markdown:'',
        html:'',
        markdownIt:new MarkdownIt(),
    },
    mutations:{
        updateMarkdown(state,content){
            if(!content)
                content=window.Editor.getContent();
            state.markdown=content;
            state.html = state.markdownIt.render(content);
            console.log(state.html);
        }
    },
    actions:{
        updateDisplay(context,markdown){
            context.commit('updateMarkdown',markdown);
        }
    }
})

export {editorStore};