import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.config.productionTip = false;
import moment from 'moment';

Vue.use(VueRouter)
Vue.use(Antd);
Vue.use(CKEditor);
Vue.use(moment);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    // mode:'history',
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
