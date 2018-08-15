import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 应用初始状态
const state = {
  socket: null,
  socketMsg: {},
  listOfFriends:[]
};

const getters = {
  // getArticleLists: state => { state.articleLists },
  // getArticleLists22: state => { state.articleLists },
}

// 定义所需的 mutations
const mutations = {
  connectSocket(state,socket) {
    state.socket = socket;
  },
  receiveMsg(state,msg) {
    switch(msg.type)
    {
      case 1:
        if(state.socketMsg[msg.fromUser]==undefined){
          state.socketMsg[msg.fromUser]=[];
        }
        state.socketMsg[msg.fromUser].push(msg);
        break;
      default:
        // n 与 case 1 和 case 2 不同时执行的代码
    }


  },
  setListOfFriends(state,data) {
    state.listOfFriends = data;
  },
};

const actions = {
  // getArticleLists(context) {
  //   context.commit('addArticleNumber');
  //   context.commit('addArticleLists', data);
  // },
  // getArticleLists222(context) {
  //   context.commit('addArticleNumber');
  //   context.commit('addArticleLists', data);
  // }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
