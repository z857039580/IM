import axios from 'axios';
import qs from 'qs';
import crypto from 'crypto';
import socketIo from 'socket.io-client';


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.withCredentials=true;/*配合后台session*/

const remoteAddress = 'http://192.168.26.136:3334';
axios.defaults.baseURL = remoteAddress;


// request统一处理操作
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){//POST传参序列化
    config.data = qs.stringify(config.data);
  };
  return config;
},(error) =>{
  return Promise.reject(error);
});

// response统一处理操作
axios.interceptors.response.use((res,next) =>{
  if(res.data.code == -4){
    sessionStorage.clear();
    next({path:'/loginORregister'});
    return;
  }else if(res.data.code != 0){
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});






const regExp = {
  a:/^(\w){3,20}$/,    /*(3-20位 所有的字母数字和_)*/
  b:/^[\u4E00-\u9FA5A-Za-z0-9_]{3,20}$/,    /*3-20位 中文、英文、数字包括下划线*/
};




export default {
  install: function (Vue, options) {

    // ------------------------4. 添加实例方法
    Vue.prototype.remoteAddress = remoteAddress;

    /*-function-*/
    Vue.prototype.regExp0 = str => {return regExp.a.test(str);};
    Vue.prototype.regExp1 = str => {return regExp.b.test(str);};
    Vue.prototype.cryptoMd5 = str => {return crypto.createHash('md5').update(str).digest('hex');};
    Vue.prototype.setUser = obj => {return sessionStorage.setItem('user_socketWebsite',JSON.stringify(obj));};
    Vue.prototype.getUser = () => {return JSON.parse(sessionStorage.getItem('user_socketWebsite'));};

    /*-API-*/
    Vue.prototype.api_register = params => {return axios.post(`/v1/register`, params).then(res => res.data).catch(error => error);};
    Vue.prototype.api_login = params => {return axios.post(`/v1/login`, params).then(res => res.data).catch(error => error);};
    Vue.prototype.api_searchUser = params => {return axios.get(`/v1/searchUser`, {params:params}).then(res => res.data).catch(error => error);};
    Vue.prototype.api_listOfFriends = params => {return axios.get(`/v1/listOfFriends`, {params:params}).then(res => res.data).catch(error => error);};

    /*-socket-*/
    Vue.prototype.socketApi = function (userIdObj) {
      let socket = socketIo.connect(remoteAddress);
      socket.emit('socket/setUserId',userIdObj);
      return socket;
    };



  }
};
