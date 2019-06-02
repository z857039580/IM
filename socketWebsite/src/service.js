import axios from "axios";
import crypto from "crypto";

const api_Address = "http://192.168.26.136:3334";
axios.defaults.baseURL = api_Address;

const regExp = {
  a: /^(\w){3,20}$/, /*(3-20位 所有的字母数字和_)*/
  b: /^[\u4E00-\u9FA5A-Za-z0-9_]{3,20}$/, /*3-20位 中文、英文、数字包括下划线*/
};

const errCallback = function (err) {
  console.log(err);
  return err;
};
const successCallback = function (res) {
  return res.data;
};



export default {
  install: function (Vue, options) {

// ------------------------4. 添加实例方法
    Vue.prototype.api_Address = api_Address;

    Vue.prototype.defaultAvatar = './static/images/header.jpg';


    /*-function-*/
    Vue.prototype.regExp0 = str => {
      return regExp.a.test(str);
    };
    Vue.prototype.regExp1 = str => {
      return regExp.b.test(str);
    };
    Vue.prototype.cryptoMd5 = str => {
      return crypto.createHash("md5").update(str).digest("hex");
    };
    Vue.prototype.setUser = obj => {
      return sessionStorage.setItem("currentUser", JSON.stringify(obj));
    };
    Vue.prototype.getUser = () => {
      return JSON.parse(sessionStorage.getItem("currentUser"));
    };
    Vue.prototype.removeUser = () => {
      sessionStorage.removeItem("currentUser");
    };


    /*-API-*/
    Vue.prototype.api_register = params => {
      return axios.post("/v1/register", params).then(successCallback).catch(errCallback);
    };
    Vue.prototype.api_login = params => {
      return axios.post("/v1/login", params).then(successCallback).catch(errCallback);
    };
    Vue.prototype.api_searchUser = params => {
      return axios.get("/v1/searchUser", {params: params}).then(successCallback).catch(errCallback);
    };
    Vue.prototype.api_listOfFriends = params => {
      return axios.get("/v1/listOfFriends", {params: params}).then(successCallback).catch(errCallback);
    };
    Vue.prototype.updateUserInfo = params => {
      return axios.post("/v1/updateUserInfo", params).then(successCallback).catch(errCallback);
    }





  }
};
