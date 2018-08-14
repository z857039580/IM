import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 应用初始状态
const state = {
  socket: null,
  socketMsg: [],
  listOfFriends:[]
};

const getters = {
  getArticleLists: state => { state.articleLists },
  getArticleLists22: state => { state.articleLists },
}

// 定义所需的 mutations
const mutations = {
  connectSocket(state,socket) {
    state.socket = socket;
  },
  receiveMsg(state,msg) {
      state.socketMsg.push(msg);

      if(msg.type==1){
        state.listOfFriends.forEach((friend,index)=>{
          let newArr = state.socketMsg.filter(function(item){
            return item.fromUser==friend.friendUserId || item.toUser==friend.friendUserId;
          });
          state.socketMsg[friend.friendUserId] = newArr;
        });
      }
  },
  setListOfFriends(state,data) {
    state.listOfFriends = data;
  },
};

const actions = {
  getArticleLists(context) {
    context.commit('addArticleNumber');
    context.commit('addArticleLists', data);
  },
  getArticleLists222(context) {
    context.commit('addArticleNumber');
    context.commit('addArticleLists', data);
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})




