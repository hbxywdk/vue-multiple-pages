import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './router';
import '../../css/base.less'
import App from './main'
// import '../../config/config.js'


Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

Vue.config.devtools = true;
Vue.config.debug = true;

new Vue({
  el: '#app',
  router,
  components: { App }
})
