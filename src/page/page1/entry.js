import Vue from 'vue';
import App from './main'

import '../../css/base.less'

import '../../config/config.js'

Vue.config.devtools = true;
Vue.config.debug = true;

new Vue({
  el: '#app',
  components: { App }
})
