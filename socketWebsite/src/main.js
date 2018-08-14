// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/css/config.css'

import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);


import service from './service.js';
Vue.use(service);


import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
fontawesome.library.add(solid, regular, brands);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import store from './store';


import App from './view/loginAfter';
import router from './router';

router.beforeEach((to, from, next) => {
  if(to.path == '/loginORregister'){
    next();
    return;
  };

  let user = Vue.prototype.getUser();
  if(user==null){
    next({path:'/loginORregister'});
  }else{
    next();
  };
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
});
