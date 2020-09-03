import Vue from 'vue'
import App from './App'
import './index.css';
import Vuex from 'vuex';
import {editorStore} from './lib/editorStore.js';



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ 
    el: '#app', 
    store:editorStore,
    render: h => h(App) 
})