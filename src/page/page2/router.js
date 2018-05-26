import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './components/Index.vue';
import My from './components/My.vue';

Vue.use(VueRouter);

const routes = [
  { 
  	path: '/', 
  	name: 'index',
  	component: Index,
  },
  { 
  	path: '/my', 
  	name: 'my',
  	component: My,
  },
]
export default routes;