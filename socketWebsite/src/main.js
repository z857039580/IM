// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import axios from "axios";
import qs from "qs";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);

import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";
fontawesome.library.add(solid, regular, brands);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import store from "./store";


import App from "./app";
import router from "./router";

router.beforeEach((to, from, next) => {
	if(to.path == "/signUp"){
		next();
		return;
	}

	let user = Vue.prototype.getUser();
	if(user===null){
		next({path:"/signUp"});
	}else{
		next();
	}
});

axios.interceptors.request.use(
  (config) => {
    if (config.method === "post") {//POST传参序列化
      config.data = qs.stringify(config.data);
    };

    if(Vue.prototype.getUser()!==null){
      config.headers['authorization'] = Vue.prototype.getUser().token;
    }else{
      config.headers['authorization'] = '';
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res, next) => {
    if (res.data.code === -4) {
      sessionStorage.clear();
      router.replace({path: '/signUp'});
      return;
    };
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);




Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,//使用store
	components: { App },
	template: "<App/>"
});
