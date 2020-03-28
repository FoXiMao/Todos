// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import stroe from './stroe'



Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Antd)
Vue.use(VueAxios, axios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
