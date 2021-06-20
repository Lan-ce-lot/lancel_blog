import Vue from 'vue';
// 注册ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 注册myPlugIn
import myPlugin from "@/plugin/myPlugin";
Vue.use(myPlugin)



